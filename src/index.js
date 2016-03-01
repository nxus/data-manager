'use strict';

import Promise from 'bluebird'
import fs from 'fs'
import path from 'path'
import _ from 'underscore'

Promise.promisifyAll(fs)

import CSVParser from './CSVParser'
import ArcJSONParser from './ArcJSONParser'
import GeoJSONParser from './GeoJSONParser'

/**
 * Import file contents as arrays of objects
 * 
 * All responses accept an options argument, in addition to any parser-specific options
 * you can indicate:
 *  * `mapping`: object of {field: newField} name mappings
 *  * `postProcess`: handler (that can return a promise) to postprocess each
 *  * `identityFields`: for importing to models, array of fields to be used for createOrUpdate query
 */

export default class FileImport {
  constructor(app) {
    this.app = app
    this._parsers = {}
    this._exporters = {}
    app.get('file-import').use(this)
      .gather('parser')
      .gather('exporter')
      .respond('export')
      .respond('import')
      .respond('importFile')
      .respond('importToModel')
      .respond('importFileToModel')

    new CSVParser(app)
    new ArcJSONParser(app)
    new GeoJSONParser(app)

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

  /**
   * Request formattted output based on type
   * @param {string} type The type (e.g. 'html') of the output content
   * @param {[object]} records The records to export
   * @param {object} opts Options for the exporter context
   * @return {Promise} String of formatted output
   */
  export(type, records, opts) {
    if (opts === undefined) opts = {}
    if(!this._exporters[type]) throw new Error('No matching exporter found: '+ type);
    return this._exporters[type](records, opts);
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
    if(!this._parsers[type]) throw new Error('No matching parser found: '+ type);
    return this._postProcess(this._mappingNames(this._parsers[type](content, opts), opts), opts);
  }

  /**
   * Request parsed results from a file path
   * @param {string} filename The filename to read and parse
   * @param {object} opts Options for the parser context
   * @return {Promise} Array of parsed result objects
   */
  importFile(filename, opts) {
    return fs.readFileAsync(filename).then((content) => {
      content = content.toString()
      var type = path.extname(filename).replace(".", "");
      if (opts.type) {
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
  
  _modelImport(model_id, results, options) {
    var identityFields = options.identityFields || ['id']
    return this.app.get('storage').getModel(model_id).then((model) => {
      var model_attrs = _.keys(model._attributes)
      return Promise.map(results, (r) => {
        var values = _.pick(r, ...model_attrs)
        var criteria = _.pick(values, ...identityFields)
        return model.createOrUpdate(criteria, values)
      })
    })
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

  _postProcess(results, options) {
    if (options.postProcess === undefined) {
      return results
    }
    return Promise.mapSeries(results, options.postProcess)
  }
}
