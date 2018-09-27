import {dataManager} from '../../'
import xlsx from 'xlsx'

export default class XLSParser {
  constructor() {
    dataManager.parser('xls', this.parse.bind(this))
    dataManager.parser('xlsx', this.parse.bind(this))
  }

  /*
   * @param {string} contents
   * @param {Object} opts  {sheetIndex: 0, headerRowCount: 0, headers: []}
   */
  
  async parse(contents, opts={}) {
    let sheet
    try {
      sheet = this._readWorkbook(contents, opts)
    } catch (e) {
      throw new Error('Could not read workbook: ' + e.message)
    }

    let headingRow = sheet.limits.firstRow + (opts.headerRowCount || 0),
        firstDataRow = headingRow + 1,
        columnPositions = {}

    let headers = opts.headers || []
    for (let col = sheet.limits.firstCol, lim = sheet.limits.lastCol; col <= lim; col += 1) {
      let key = (headers.length > 0) ? headers.shift() : sheet.cell([col, headingRow])
      if (key) columnPositions[key] = col
    }

    let objects = []

    for (let row = firstDataRow, lim = sheet.limits.lastRow; row <= lim; row += 1) {
      // collect objects from row
      let obj = {}, empty = true
      for (let name in columnPositions) {
        let str = sheet.cell([columnPositions[name], row])
        if (str != undefined) empty = false

        obj[name] = str
      }
      // discard row if all referenced cells were undefined (not just empty)
      if (!empty) objects.push(obj)
    }

    return objects
    
  }

  _readWorkbook(contents, opts) {
    let body = Buffer.from(contents, 'binary') // XLSX seems to like this best
    let workbook = xlsx.read(body, {type: "buffer"})
    let sheet = workbook.Sheets[workbook.SheetNames[opts.sheetIndex || 0]]
    if (!sheet) throw new Error('no spreadsheet found')
    return new Sheet(sheet)
  }
}



/** Spreadsheet class.
 * Adds some useful methods to spreadsheet produced by XLSX. Also
 * performs a tighter calculation of the spreadsheet limits.
 */
class Sheet {
  constructor(props) {
    Object.assign(this, props)

    let sheetLimits = {firstCol: 0, lastCol: Infinity, firstRow: 0, lastRow: Infinity},
        cellLimits = {firstCol: Infinity, lastCol: 0, firstRow: Infinity, lastRow: 0}
    // first, determine sheet limits
    if (this['!ref']) {
      let m = this['!ref'].match(/^(.*):(.*)$/), pos
      if (m) {
        pos = Sheet.parseA1(m[1])
        if (pos) {
          sheetLimits.firstCol = pos[0]
          sheetLimits.firstRow = pos[1]
        }
        pos = Sheet.parseA1(m[2])
        if (pos) {
          sheetLimits.lastCol = pos[0]
          sheetLimits.lastRow = pos[1]
        }
      }
    }
    // second, scan cells to determine cell limits
    for (let key in props) {
      if (props.hasOwnProperty(key)) {
        let pos = Sheet.parseA1(key)
        if (pos) {
          if (pos[0] < cellLimits.firstCol) cellLimits.firstCol = pos[0]
          if (pos[0] > cellLimits.lastCol) cellLimits.lastCol = pos[0]
          if (pos[1] < cellLimits.firstRow) cellLimits.firstRow = pos[1]
          if (pos[1] > cellLimits.lastRow) cellLimits.lastRow = pos[1]
        }
      }
    }
    // finally, combine sheet and cell limits
    this._limits = {
      firstCol: Math.max(sheetLimits.firstCol, cellLimits.firstCol),
      lastCol: Math.min(sheetLimits.lastCol, cellLimits.lastCol),
      firstRow: Math.max(sheetLimits.firstRow, cellLimits.firstRow),
      lastRow: Math.min(sheetLimits.lastRow, cellLimits.lastRow) }
  }

  get limits() { return this._limits }

  cell(pos) {
    let c = this[xlsx.utils.encode_cell({c: pos[0], r: pos[1]})]
    return c && c.v
  }

  /** Parses A1-style spreadsheet cell reference.
   * @param {string} key - cell reference
   * @return {Array} two-element array containing column and row indexes
   *   (both zero-based)
   */
  static parseA1(key) {
    let m = key.match(/^([A-Z]{1,2})([0-9]+)$/), pos
    if (m) {
      let col = 0, row = parseInt(m[2])
      for (let i = 0, s = m[1]; i < s.length; i += 1)
        col = col * 26 + (s.charCodeAt(i) - Sheet.charACode + 1)
      pos = [col - 1, row - 1]
    }
    return pos
  }

  /** Formats A1-style spreadsheet cell reference.
   * @param {Array} pos - two-element array containing column and row
   *   indexes (both zero-based)
   * @return {string} cell reference
   */
  static formatA1(pos) {
    let col = pos[0] + 1, key = ''
    do {
      key = String.fromCharCode(Sheet.charACode - 1 + col % 26) + key
      col = Math.floor(col / 26)
    } while (col !== 0)
    key += (pos[1] + 1).toFixed()
    return key
  }
}
Sheet.charACode = 'A'.charCodeAt(0)

