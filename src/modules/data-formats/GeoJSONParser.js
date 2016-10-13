import _ from 'underscore'
import {dataManager} from '../../'

export default class GeoJSONParser {
  constructor() {
    dataManager.parser('geojson', this.parse.bind(this))
  }

  parse(contents, opts) {
    let json = JSON.parse(contents)
    let results = _.map(json.features, (f) => {
      return _.extend(f, f.properties)
    })
    return results
  }
  
}
