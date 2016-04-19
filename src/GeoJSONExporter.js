import _ from 'underscore'

export default class GeoJSONExporter {
  constructor(app) {
    app.get('data-loader').exporter('geojson', this.export.bind(this))
  }

  export(records, opts) {
    
    let json = {
      type: 'FeatureCollection',
      features: records
    }
    return JSON.stringify(json)
  }
  
}
