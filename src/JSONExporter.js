
export default class JSONExporter {
  constructor(app) {
    app.get('data-loader').exporter('json', this.export.bind(this))

  }

  /**
   * Stringify an array of results into JSON. Assumes top-level is array, unless
   *  opts.key is provided to wrap results in an object.
   * @param {array} records
   * @param {object} options
   */
  export(records, opts) {
    if (opts.key) {
      let obj = {}
      obj[opts.key] = records
      records = obj
    }
    return JSON.stringify(records)
  }
  
}
