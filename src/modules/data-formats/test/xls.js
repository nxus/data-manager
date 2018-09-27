import {dataManager as proxy} from '../../../'
import XLSParser from '../XLSParser'

import Promise from 'bluebird'
import fs from 'fs'
Promise.promisifyAll(fs)

let dataFileName = __dirname+'/data/simple.xlsx'
let contents

describe("Excel files", () => {
  let module
  before(async () => {
    module = proxy._instance
    contents = await fs.readFileAsync(dataFileName)
  })

  it("parse simple file", async () => {
    let x = new XLSParser()

    let results = await x.parse(contents)
    results.length.should.equal(2)
    results[0].should.eql({a: 1, b: 2, c:3})
    results[1].should.eql({a: 4, b: 5, c:6})
  })
  it("parse second sheet", async () => {
    let x = new XLSParser()

    let results = await x.parse(contents, {sheetIndex: 1})
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
})
