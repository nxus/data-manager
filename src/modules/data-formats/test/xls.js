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
})
