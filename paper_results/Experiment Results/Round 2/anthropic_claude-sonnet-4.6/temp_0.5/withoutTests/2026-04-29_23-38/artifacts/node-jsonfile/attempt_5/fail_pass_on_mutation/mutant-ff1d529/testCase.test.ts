import * as path from 'path'
import * as fs from 'fs'
import * as os from 'os'
import jsonfile from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js'

describe('readFileSync with string encoding option', () => {
  it('should correctly parse a BOM-prefixed JSON file when encoding is passed as a string', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jsonfile-test-'))
    const tmpFile = path.join(tmpDir, 'test.json')
    
    try {
      const testData = { x: 1 }
      // Write JSON with UTF-8 BOM prefix
      const bom = Buffer.from([0xEF, 0xBB, 0xBF])
      const content = Buffer.from(JSON.stringify(testData), 'utf8')
      fs.writeFileSync(tmpFile, Buffer.concat([bom, content]))
      
      // Original: options = { encoding: 'utf8' } → readFileSync returns string with BOM char
      //           stripBom strips \uFEFF from string → JSON.parse succeeds
      // Mutated:  options = {} → readFileSync returns Buffer with BOM bytes
      //           stripBom on Buffer may not strip BOM → JSON.parse fails
      const result = jsonfile.readFileSync(tmpFile, 'utf8')
      
      expect(result).toEqual(testData)
    } finally {
      try { fs.unlinkSync(tmpFile) } catch {}
      try { fs.rmdirSync(tmpDir) } catch {}
    }
  })
})