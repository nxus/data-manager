import fs from 'fs';
import parse from 'csv-parse';
import Promise from 'bluebird';
import _ from 'underscore'

export default class CSVParser {
  constructor(app) {
    app.get('data-loader').parser('csv', _.partial(this.parse, ',').bind(this))
    app.get('data-loader').parser('tsv', _.partial(this.parse, '\t').bind(this))

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
        results = _.map(data, (row) => {
          return _.object(header, row)
        })
        resolve(results)
      })
    })
  }
  
}
