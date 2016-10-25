import fs from 'fs';
import parse from 'csv-parse';
import Promise from 'bluebird';
import _ from 'underscore'

import {dataManager} from '../../'

export default class CSVParser {
  constructor() {
    dataManager.parser('csv', _.partial(this.parse, ',').bind(this))
    dataManager.parser('tsv', _.partial(this.parse, '\t').bind(this))
  }

  parse(delimiter, contents, opts) {
    var delimiter = opts.delimiter || delimiter
    return new Promise((resolve, reject) => {
      parse(contents, {delimiter: delimiter, trim: true}, (err, data) => {
        if (err) {
          reject(err)
          return
        }
        var header = data.shift();
        let results = _.map(data, (row) => {
          row = _.map(row, (r) => {if(_.isString(r)) r = r.trim(); return r})
          return _.object(header, row)
        })
        resolve(results)
      })
    })
  }
  
}
