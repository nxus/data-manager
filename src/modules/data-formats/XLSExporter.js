import {dataManager} from '../../'
import xlsx from 'xlsx'


export default class XLSExporter {
  constructor() {
    dataManager.exporter('xls', this.export.bind(this))
    dataManager.exporter('xlsx', this.export.bind(this))
  }

  /*
   * @param {Array}  records
   * @param {Object} opts  {sheetName: 'Sheet1', headers: []}
   */
  export(records, opts) {
    let columnNames = opts.headers || Object.keys(records[0])
    let rows = records.map((x) => {
      let val = []
      for (let n of columnNames) {
        val.push(x[n])
      }
      return val
    })
        
    let workbook = xlsx.utils.book_new(),
        sheet = xlsx.utils.aoa_to_sheet([columnNames])
    xlsx.utils.sheet_add_aoa(sheet, rows, {origin: 1})
    xlsx.utils.book_append_sheet(workbook, sheet, opts.sheetName || 'Sheet1')

    let content = xlsx.write(workbook, {type: 'buffer'})
    return content
  } 
}
