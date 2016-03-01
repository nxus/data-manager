/* 
* @Author: Mike Reich
* @Date:   2016-02-13 08:59:44
* @Last Modified 2016-02-13 @Last Modified time: 2016-02-13 08:59:44
*/

'use strict';

import Module from '../src/'

import TestApp from '@nxus/core/lib/test/support/TestApp';

describe("Data Loader Module", () => {
  var module, app;
 
  beforeEach(() => {
    app = new TestApp();
    module = new Module(app);
  });
  
  describe("Load", () => {
    it("should not be null", () => Module.should.not.be.null)

    it("should be instantiated", () => {
      module.should.not.be.null;
    });
  });

  describe("events", () => {
    it("should gather parsers", () => {
      app.get().gather.calledWith('parser').should.be.true
    })
    it("should respond for imports", () => {
      app.get().respond.calledWith('import').should.be.true
      app.get().respond.calledWith('importFile').should.be.true
      app.get().respond.calledWith('importToModel').should.be.true
      app.get().respond.calledWith('importFileToModel').should.be.true
    })
  })
})
