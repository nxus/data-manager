/**
 * Import file contents as arrays of objects. Includes parsers and exporters for:
 * 
 *  * CSV / TSV
 *  * JSON
 *  * GeoJSON / ArcJSON
 * 
 * Provides convenience integration with `nxus-storage` to import and save to a storage model.
 * 
 * ## Installation
 *
 *    > npm install nxus-data-manager --save
 *
 * ## Options
 *
 * All responses accept an options argument, in addition to any parser-specific options
 * you can indicate:
 *  * `mapping`: object of {field: newField} name mappings
 *  * `identityFields`: for importing to models, array of fields to be used for createOrUpdate query
 *  * `truncate`: for importing to models, true/false for deleting existing collection data before import. Ignored if `identityFields` is provided.
 *  * `strict`: defaults to true. Only import columns/data that matches the attribute names for the model. Set to false to import everything.
 *  * `endOnError`: defaults to true. Will end the import if any record is invalid or can't be saved. The original error will be thrown. Set to false to continue loading other recoreds.
 * 
 * ## Events
 *
 * You can modify the records during import with the following specific events:
 *  * `records.type`: e.g. `dataManager.after('records.csv', (results) => {})`
 *  * `record.type`: e.g. `dataManager.after('record.csv', (one) => {})`
 *  * `models.identity`: e.g. `dataMangaer.after('models.user', (results) => {})`
 *  * `model.identity`: e.g. `dataManager.after('model.user', (user) => {})`
 *
 * record* events occur after parsing and name mapping
 * model* events occur after record events and before models are created/updated.
 * 
 * # API
 * -----
 */

'use strict';

import {NxusModule} from 'nxus-core'
import {storage} from 'nxus-storage'
import {router} from 'nxus-router'

import Promise from 'bluebird'
import fs from 'fs'
import path from 'path'
import _ from 'underscore'
import multer from 'multer';
import morph from 'morph';

Promise.promisifyAll(fs)

const _defaultImportOptions = {
  truncate: true,
  identityFields: [],
  strict: true,
  endOnError: true
}

class DataManager extends NxusModule {
  constructor() {
    super()
    this._parsers = {}
    this._exporters = {}
  }

  /**
   * Provide a parser for a particular type (file extension)
   * @param {string} type The type (e.g. 'html') this renderer should handle
   * @param {function} handler Function to receive (content, options) and return parsed array of result objects
   */
  parser(type, handler) {
    this._parsers[type] = handler
  }
  /**
   * Provide an exporter for a particular type (file extension)
   * @param {string} type The type (e.g. 'html') this exporter creates
   * @param {function} handler Function to receive (content, options) and return formatted output content
   */
  exporter(type, handler) {
    this._exporters[type] = handler
  }

  uploadPath(path, field, dest=process.cwd()+'/uploads/') {
    this.log.debug("Setting multer upload path", path, field)
    var upload = multer({dest: dest})
    router.middleware(path, upload.single(field))
  }
  
  /**
   * Request formattted output based on type
   * @param {string} type The type (e.g. 'html') of the output content
   * @param {[object]} records The records to export
   * @param {object} opts Options for the exporter context
   * @return {Promise} String of formatted output
   */
  export(type, records, opts) {
    if (opts === undefined) opts = {}
    if(!this._exporters[type]) throw new Error('No matching exporter found: '+ type)
    return Promise.resolve(this._exporters[type](records, opts))
  }

  /**
   * Request parsed results based on type
   * @param {string} type The type (e.g. 'html') of the content
   * @param {string} content The contents to parse 
   * @param {object} opts Options for the parser context
   * @return {Promise} Array of parsed result objects
   */
  import(type, content, opts) {
    if (opts === undefined) opts = {}
    if(!this._parsers[type]) throw new Error('No matching parser found: '+ type)
    return Promise.resolve(this._parsers[type](content, opts)).then((results) => {
      return Promise.mapSeries(this._mappingNames(results, opts), (record) => { return this.emit('record.'+type, record)}).then((records) => {
        return this.emit('records.'+type, records)
      })
    })
  }

  /**
   * Request parsed results from a file path
   * @param {string} filename The filename to read and parse
   * @param {object} opts Options for the parser context
   * @return {Promise} Array of parsed result objects
   */
  importFile(filename, opts) {
    return fs.readFileAsync(filename).then((content) => {
      var type = path.extname(filename).replace(".", "")
      if (opts && opts.type) {
        type = opts.type
      }
      return this.import(type, content, opts)
    })
  }
  
  /**
   * Import string contents to a model
   * @param {string} model The identity of the model to populate
   * @param {string} type The type (e.g. 'html') of the content
   * @param {string} content The contents to parse 
   * @param {object} opts Options for the parser context
   * @return {Promise} Array of instances
   */
  importToModel(model, type, content, opts) {
    return this.request('import', type, content, opts).then((results) => {
      return this._modelImport(model, results, opts)
    })
  }

  /**
   * Import file contents to a model
   * @param {string} model The identity of the model to populate
   * @param {string} filename The filename to read and parse
   * @param {object} opts Options for the parser context
   * @return {Promise} Array of instances
   */
  importFileToModel(model, filename, opts) {
    return this.request('importFile', filename, opts).then((results) => {
      return this._modelImport(model, results, opts)
    })
  }

  // Internal
  
  _modelImport(model_id, results, opts) {
    if (opts === undefined) opts = _defaultImportOptions

    if(typeof opts.strict != 'undefined' && opts.strict === false) {
      results = _.map(results, (r) => {
        var values = {}
        _.each(r, (value, key) => {
          values[morph.toSnake(key)] = value
        })
        return values
      })
    }

    return Promise.mapSeries(results, (record) => { return this.emit('model.'+model_id, record)}).then((records) => {
      return this.emit('models.'+model_id, records).then((results) => {
        return storage.getModel(model_id).then((model) => {
          var model_attrs = _.keys(model._attributes)
          var identityFields = opts.identityFields
          var hasIdentity = !_.isEmpty(identityFields)
          let importResults = () => {
            return Promise.mapSeries(results, (r) => {
              let action = null
              if(typeof opts.strict != 'undefined' && opts.strict === false) {
                var values = r
              } else {
                var values = _.pick(r, ...model_attrs)
              }
              if (hasIdentity) {
                var criteria = _.pick(values, ...identityFields)
                action = this._storeResultsWithModel(model, values, criteria)
              } else {
                action = this._storeResultsWithModel(model, values)
              }
              if(opts.endOnError)
                return action
              else
                return action.catch((e) => {this.log.error("Error importing "+model_id, e, e.details)})
            })
          }
          
          if (opts.truncate && !hasIdentity) {
            return model.destroy({}).then(importResults)
          } else {
            return importResults()
          }
        }).catch((e) => {this.log.error("Error importing "+model_id, e, e.details)})
      })
    })
  }

  /** 
   * @private
   * Simple do-storage function
   * to help mock up storage for tests, other applications.
   * @param  {[type]} model          [description]
   * @param  {[type]} values         [description]
   * @param  {[type]} uniqueCriteria [description]
   * @return {[type]}                [description]
   */
  _storeResultsWithModel(model, values, uniqueCriteria) {
    if (uniqueCriteria) 
      return model.createOrUpdate(uniqueCriteria, values)
    else 
      return model.create(values)
  }


  _mappingNames(results, options) {
    var mapping = options.mapping
    if (mapping === undefined || _.isEmpty(mapping)) {
      return results
    }
    var oldNames = _.keys(mapping)
    return _.map(results, (r) => {
      _.mapObject(mapping, (k, v) => {
        r[k] = r[v]
      })
      return _.omit(r, ...oldNames)
    })
  }

}

const dataManager = DataManager.getProxy()
import {fixtures} from './modules/data-fixtures'
export {DataManager as default, dataManager, fixtures}
