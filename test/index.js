/* 
* @Author: Mike Reich
* @Date:   2016-02-13 08:59:44
* @Last Modified 2016-02-13 @Last Modified time: 2016-02-13 08:59:44
*/

'use strict';
import _ from 'underscore'

import Module from '../src/'
import CSVParser from '../src/CSVParser'
import CSVExporter from '../src/CSVExporter'
import JSONParser from '../src/JSONParser'
import JSONExporter from '../src/JSONExporter'

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
    it("should gather exporters", () => {
      app.get().gather.calledWith('exporter').should.be.true
    })
    it("should respond for imports", () => {
      app.get().respond.calledWith('import').should.be.true
      app.get().respond.calledWith('importFile').should.be.true
      app.get().respond.calledWith('importToModel').should.be.true
      app.get().respond.calledWith('importFileToModel').should.be.true
    })
    it("should respond for exports", () => {
      app.get().respond.calledWith('export').should.be.true
    })
    it("should register default handlers", () => {
      app.get().provide.calledWith('parser', 'csv')
      app.get().provide.calledWith('parser', 'tsv')
      app.get().provide.calledWith('parser', 'geojson')
      app.get().provide.calledWith('parser', 'arcjson')
      app.get().provide.calledWith('exporter', 'csv')
      app.get().provide.calledWith('exporter', 'tsv')
    })
  })

  describe("CSV", () => {
    beforeEach(() => {
      let p = new CSVParser(app)
      let e = new CSVExporter(app)
      // workaround TestApp register and events
      module.parser('csv', _.partial(p.parse, ','))
      module.exporter('csv', _.partial(e.export, ','))
    })
    it("should parse", () => {
      return module.import("csv", "A,B,C,D\n1,2,3,4\n").then((objs) => {
        objs.length.should.equal(1)
        objs[0].should.have.property("A", "1")
        objs[0].should.have.property("B", "2")
      })
    })
    it("should export", () => {
      return module.export("csv", [{A: 1, B: 2, C: 3, D: 4}]).then((contents) => {
        contents.should.equal( "A,B,C,D\n1,2,3,4\n")
      })
    })
    it("should emit records events", () => {
      return module.import("csv", "A,B,C,D\n1,2,3,4\n").then((objs) => {
        app.get('data-loader').emit.calledWith('records.csv').should.be.true
        app.get('data-loader').emit.calledWith('record.csv').should.be.true
      })
    })
    it("should emit model events", (done) => {
      // Can't actually use promise because storage does not return
      module._modelImport("test_model", [{a:1}], {})
      setTimeout(() => {
        app.get('data-loader').emit.calledWith('models.test_model').should.be.true
        app.get('data-loader').emit.calledWith('model.test_model').should.be.true
        app.get('storage').provide.calledWith('getModel', 'test_model').should.be.true
        done()
      }, 100)
    })
  })

  describe("JSON", () => {
    beforeEach(() => {
      let p = new JSONParser(app)
      let e = new JSONExporter(app)
      // workaround TestApp register and events
      module.parser('json', p.parse)
      module.exporter('json', e.export)
    })
    it("should parse", () => {
      return module.import("json", '[{"A": "1", "B": 2}]').then((objs) => {
        objs.length.should.equal(1)
        objs[0].should.have.property("A", "1")
        objs[0].should.have.property("B", 2)
      })
    })
    it("should parse with key", () => {
      return module.import("json", '{"a": [{"A": "1", "B": 2}]}', {key: 'a'}).then((objs) => {
        objs.length.should.equal(1)
        objs[0].should.have.property("A", "1")
        objs[0].should.have.property("B", 2)
      })
    })
    it("should export", () => {
      return module.export("json", [{A: 1, B: 2}]).then((contents) => {
        contents.should.equal('[{"A":1,"B":2}]')
      })
    })
    it("should export with key", () => {
      return module.export("json", [{A: 1, B: 2}], {key: 'a'}).then((contents) => {
        contents.should.equal('{"a":[{"A":1,"B":2}]}')
      })
    })
  })
})
