/* 
* @Author: Mike Reich
* @Date:   2016-02-13 08:59:44
* @Last Modified 2016-05-20
*/

'use strict';
import _ from 'underscore'

import DataManagerModule from '../src/'
import {dataManager as dataProxy, fixtures} from '../src/'
import {application} from 'nxus-core'

describe("Data Loader Module", () => {
  var module

  beforeEach(() => {
    module = new DataManagerModule();
    application.emit('load')
  });
  
  describe("Load", () => {
    it("should not be null", () => DataManagerModule.should.not.be.null)

    it("should be instantiated", () => {
      module.should.not.be.null;
    });
    it("should expose fixtures", () => {
      fixtures.should.not.be.null
    })
  });

})
