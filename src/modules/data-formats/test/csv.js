import _ from 'underscore'
import {storage} from 'nxus-storage'
import {dataManager as proxy} from '../../../'
import CSVParser from '../CSVParser'
import CSVExporter from '../CSVExporter'

import Sinon from 'sinon'

//handler for model events
function testAddOneRowHandler(row) {
  return _.mapObject(row, (value) => {
    return value + 1;
  })
}

var addOneRowHandlerSpy = Sinon.spy(testAddOneRowHandler)


describe("CSV", () => {
  var module
  before(() => {
    module = proxy._instance
    Sinon.spy(module, "emit")
    Sinon.spy(storage, "provide")
    let p = new CSVParser()
    let e = new CSVExporter()
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
      module.emit.calledWith('records.csv').should.be.true
      module.emit.calledWith('record.csv').should.be.true
    })
  })
  it("should accumulate record events", () => {
    module.after('record.csv', (r) => {
      r.A += 1
      return r
    })
    module.after('record.csv', (r) => {
      r.A += 1
      r.B += 1
      return r
    })
    return module.import("csv", "A,B,C,D\n1,2,3,4\n").then((objs) => {
      module.emit.calledWith('records.csv').should.be.true
      module.emit.calledWith('record.csv').should.be.true
      console.log(objs)
      objs[0].A.should.equal('111')
      objs[0].B.should.equal('21')
    })
  })
  it("should emit model events", (done) => {
    // Can't actually use promise because storage does not return: 
    // TODO: improve this with mock storage?
    module._modelImport("test_model", [{a:1}], {})
    setTimeout(() => {
      module.emit.calledWith('models.test_model').should.be.true
      module.emit.calledWith('model.test_model').should.be.true
      storage.provide.calledWith('getModel', 'test_model').should.be.true
      done()
    }, 100)
  })
  it("should call registered model event handlers", (done)  => {
    //register handler
    module.after('model.test_model', addOneRowHandlerSpy)
    module._modelImport("test_model", [{a:2},{b:2}], {})
    setTimeout(() => {
      addOneRowHandlerSpy.calledWith({a:2}).should.be.true
      done()
    }, 100)
  })
})
