import stringify from 'csv-stringify';
import Promise from 'bluebird';
import _ from 'underscore'

import {dataManager} from '../../'

let stringifier = Promise.promisify(stringify)

export default class CSVExporter {
  constructor() {
    dataManager.exporter('csv', _.partial(this.export, ',').bind(this))
    dataManager.exporter('tsv', _.partial(this.export, '\t').bind(this))

  }

  export(delimiter, records, opts) {
    opts.delimiter = opts.delimiter || delimiter
    if (!opts.header) {
      opts.header = true
    }
    return stringifier(records, opts)
  }
  
}
