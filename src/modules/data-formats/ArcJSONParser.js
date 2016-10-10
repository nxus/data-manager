import _ from 'underscore'

import ArcGIS from 'terraformer-arcgis-parser'

import {dataManager} from '../../'

export default class ArcJSON {
  constructor() {
    dataManager.parser('arcjson', this.parse.bind(this))
  }

  parse(contents, opts) {
    let json = JSON.parse(contents)
    let results = _.map(json.features, (f) => {
      f = ArcGIS.parse(f).toJSON()
      // Why this isn't recursive I do not know
      f.geometry = f.geometry.toJSON()
      return _.extend(f, f.properties)
    })
    return results
  }
  
}
