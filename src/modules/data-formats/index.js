import {NxusModule} from 'nxus-core'

import CSVParser from './CSVParser'
import CSVExporter from './CSVExporter'
import ArcJSONParser from './ArcJSONParser'
import GeoJSONParser from './GeoJSONParser'
import GeoJSONExporter from './GeoJSONExporter'
import JSONParser from './JSONParser'
import JSONExporter from './JSONExporter'

class DataManagerFormats extends NxusModule {
  constructor() {
    super()
    new CSVParser()
    new CSVExporter()
    new ArcJSONParser()
    new GeoJSONParser()
    new GeoJSONExporter()
    new JSONParser()
    new JSONExporter()
    
  }
}
