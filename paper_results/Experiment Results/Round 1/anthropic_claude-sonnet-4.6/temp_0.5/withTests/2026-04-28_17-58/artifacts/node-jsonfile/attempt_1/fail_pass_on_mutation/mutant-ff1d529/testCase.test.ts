import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import { execSync } from 'child_process'
import jf = require('../../../../../../../../../../../subject_repositories/node-jsonfile/index.js')

describe('readFileSync with encoding string option', () => {
  it('should correctly read and parse a JSON file with BOM when encoding string utf8 is passed as options', () => {
    const TEST_DIR = path.join(os.tmpdir(), 'jsonfile-tests-mutant-ff1d529')
    
    // Setup
    try {
      fs.mkdirSync(TEST_DIR, { recursive: true })
    } catch (e) {}
    
    const file = path.join(TEST_DIR, 'bom-file.json')
    const obj = { name: 'JP', value: 42 }
    
    // Write file with BOM
    fs.writeFileSync(file, `\uFEFF${JSON.stringify(obj)}`)
    
    let data: any
    let error: Error | null = null
    
    try {
      data = jf.readFileSync(file, 'utf8')
    } catch (err) {
      error = err as Error
    }
    
    // Cleanup
    try {
      fs.unlinkSync(file)
      fs.rmdirSync(TEST_DIR)
    } catch (e) {}
    
    expect(error).toBeNull()
    expect(data).not.toBeNull()
    expect(data.name).toBe('JP')
    expect(data.value).toBe(42)
  })
})