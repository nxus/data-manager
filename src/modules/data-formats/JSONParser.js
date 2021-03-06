import {dataManager} from '../../'

export default class JSONParser {
  constructor() {
    dataManager.parser('json', this.parse.bind(this))

  }

  /**
   * Parse JSON into an array of results. Assumes top-level is array, unless
   *  opts.key is provided to pick a top-level key from parsed object as results.
   * @param {string} contents
   * @param {object} options
   */
  parse(contents, opts) {
    let results = JSON.parse(contents)
    if (opts.key) {
      results = results[opts.key]
    }
    return results
  }
  
}
