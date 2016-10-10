import {application, NxusModule} from 'nxus-core'
import {dataManager} from '../../'

class DataFixtures extends NxusModule {

  /**
   * Import a data file as fixture data. Can specify environment option to only load for e.g. test
   * @param {string} modelId The identity of the model to import
   * @param {string} path The path to a file
   * @param {object} options Options to pass to data-loader.importFile
   */
  fixture(modelId, path, options) {
    if(!options.environment || application.config.NODE_ENV == options.environment) {
      this.log.info("Loading fixture", path, "for model", modelId)
      return application.once('startup', () => {
        return dataManager.importFileToModel(modelId, path, options)
      })
    }
  }

}

const fixtures = DataFixtures.getProxy()
export {DataFixtures as default, fixtures}
