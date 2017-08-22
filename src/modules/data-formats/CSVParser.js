import fs from 'fs'
import parse from 'csv-parse'
import csv from 'fast-csv'
import Promise from 'bluebird'
import _ from 'underscore'

import {dataManager} from '../../'

export default class CSVParser {
  constructor() {
    dataManager.parser('csv', _.partial(this.parse, ',').bind(this))
    dataManager.parser('tsv', _.partial(this.parse, '\t').bind(this))
  }

  parse(delimiter, contents, opts) {
    var delimiter = opts.delimiter || delimiter
    var parser = csv.fromString(contents, {delimiter: delimiter, trim: true, skip_empty_lines: true})
    return new Promise((resolve, reject) => {
      var results = []
      var header = null
      var completed = false
      parser.on('data', (row) => {
        if(!header) {
          header = row;
        } else {
          row = _.map(row, (r) => {if(_.isString(r)) r = r.trim(); return r})
          let newRow = {}
          header.forEach((h, i) => {
            if(h && h.length > 0 && row[i] && row[i] != '') newRow[h] = row[i]
          })
          if(!_.isEmpty(newRow)) results.push(newRow)
        }
      })

      parser.on('end', () => {
        resolve(results)
      })

      parser.on('error', (err) => {
        reject(err)
      })
    })
  }
}
