import {dataManager as proxy} from '../../../'
import XLSParser from '../XLSParser'
import XLSExporter from '../XLSExporter'

import Promise from 'bluebird'
import fs from 'fs'
Promise.promisifyAll(fs)

let dataFileName = __dirname+'/data/simple.xlsx'
let contents

describe("XLS(X)", () => {
  let module, p, e
  before(async () => {
    module = proxy._instance
    p = new XLSParser()
    e = new XLSExporter()
    contents = await fs.readFileAsync(dataFileName)
  })

  it("parse simple file", async () => {
    let results = await p.parse(contents)
    results.length.should.equal(2)
    results[0].should.eql({a: 1, b: 2, c:3})
    results[1].should.eql({a: 4, b: 5, c:6})
  })
  it("parse simple file with alternate headers", async () => {
    let results = await p.parse(contents, {headers: ["x","y","z"]})
    results.length.should.equal(2)
    results[0].should.eql({x: 1, y: 2, z:3})
    results[1].should.eql({x: 4, y: 5, z:6})
  })
  it("parse second sheet", async () => {
    let results = await p.parse(contents, {sheetIndex: 1})
    results.length.should.equal(2)
    results[0].should.eql({a: "a", b: "b", c:"c"})
    results[1].should.eql({a: "d", b: "e", c:"f"})
  })
  it("parse second sheet via data-manager importFile", async () => {
    let results = await module.importFile(dataFileName, {sheetIndex: 1})
    results.length.should.equal(2)
    results[0].should.eql({a: "a", b: "b", c:"c"})
    results[1].should.eql({a: "d", b: "e", c:"f"})
  })

  it('exports and parses', async() => {
    let data = [{a: 1, b: 2}]
    let contents = await module.export('xls', data)
    let results = await module.import('xls', contents)
    results.length.should.equal(1)
    results[0].should.eql({a: 1, b: 2})
  })
  it('exports and parses with customer header labels', async() => {
    let headers = ["b", "a"]
    let data = [{a: 1, b: 2}]
    let contents = await module.export('xls', data, {headers})
    let sh = p._readWorkbook(contents, {})
    sh.cell([0, 0]).should.equal('b')
    sh.cell([1, 0]).should.equal('a')
    let results = await module.import('xls', contents, {headers})
    results.length.should.equal(1)
    results[0].should.eql({a: 1, b: 2})
  })
})
