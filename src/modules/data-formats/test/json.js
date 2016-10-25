import {dataManager as proxy} from '../../../'
import JSONParser from '../JSONParser'
import JSONExporter from '../JSONExporter'


describe("JSON", () => {
  var module
  before(() => {
    module = proxy._instance
    let p = new JSONParser()
    let e = new JSONExporter()
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
