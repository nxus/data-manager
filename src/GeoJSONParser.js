import _ from 'underscore'

export default class GeoJSON {
  constructor(app) {
    app.get('file-import').parser('geojson', this.parse.bind(this))
  }

  parse(contents, opts) {
    let json = JSON.parse(contents)
    let results = _.map(json.features, (f) => {
      return _.extend(f, f.properties)
    })
    return results
  }
  
}
