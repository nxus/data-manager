import _ from 'underscore'
import {dataManager} from '../../'

export default class GeoJSONExporter {
  constructor() {
    dataManager.exporter('geojson', this.export.bind(this))
  }

  export(records, opts) {
    
    let json = {
      type: 'FeatureCollection',
      features: records
    }
    return JSON.stringify(json)
  }
  
}
