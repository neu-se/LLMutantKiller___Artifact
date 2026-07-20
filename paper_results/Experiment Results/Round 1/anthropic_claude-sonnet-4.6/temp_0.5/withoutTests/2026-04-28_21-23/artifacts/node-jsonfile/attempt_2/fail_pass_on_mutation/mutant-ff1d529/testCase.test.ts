import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'
import jsonfile from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js'

describe('readFileSync with string encoding option', () => {
  it('should read JSON file with UTF-8 BOM when string encoding is passed', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jsonfile-test-'))
    const tmpFile = path.join(tmpDir, 'test.json')
    
    try {
      const testData = { hello: 'world' }
      // Write file with UTF-8 BOM prefix
      const bom = Buffer.from([0xEF, 0xBB, 0xBF])
      const content = Buffer.concat([bom, Buffer.from(JSON.stringify(testData), 'utf8')])
      fs.writeFileSync(tmpFile, content)
      
      // Original: options becomes { encoding: 'utf8' }, fs returns string with BOM, stripBom removes it
      // Mutation: options becomes {}, fs returns Buffer with BOM, stripBom may not remove it, JSON.parse fails
      const result = jsonfile.readFileSync(tmpFile, 'utf8')
      expect(result).toEqual(testData)
    } finally {
      try { fs.unlinkSync(tmpFile) } catch {}
      try { fs.rmdirSync(tmpDir) } catch {}
    }
  })
})