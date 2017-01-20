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
      parse(contents, {delimiter: delimiter, trim: true, skip_empty_lines: true}, (err, data) => {
        if (err) {
          reject(err)
          return
        }
        var header = data.shift();
        let results = _.compact(_.map(data, (row) => {
          row = _.map(row, (r) => {if(_.isString(r)) r = r.trim(); return r})
          let newRow = {}
          header.forEach((h, i) => {
            if(h && h.length > 0 && row[i] && row[i] != '') newRow[h] = row[i]
          })
          if(_.compact(_.values(newRow)).length == 0) return null
          return newRow
        }))
        resolve(results)
      })
    })
  }
}
