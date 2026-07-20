import * as path from 'path'
import * as fs from 'fs'
import * as os from 'os'
import jsonfile from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js'

describe('readFileSync with string encoding option', () => {
  it('should use the provided encoding when options is passed as a string, affecting how file bytes are interpreted', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jsonfile-test-'))
    const tmpFile = path.join(tmpDir, 'test.json')
    
    try {
      const testData = { hello: 'world' }
      // Write the JSON as base64-encoded content in the file
      // So the file contains the base64 representation of the JSON string
      const jsonStr = JSON.stringify(testData)
      const base64Content = Buffer.from(jsonStr).toString('base64')
      fs.writeFileSync(tmpFile, base64Content, 'binary')
      
      // When reading with 'base64' encoding, fs.readFileSync decodes the base64
      // and returns the original JSON string, which can be parsed
      // When encoding is lost (mutated), fs.readFileSync returns a Buffer of raw bytes
      // which when parsed as JSON will fail or return wrong result
      const result = jsonfile.readFileSync(tmpFile, 'base64')
      
      expect(result).toEqual(testData)
    } finally {
      try { fs.unlinkSync(tmpFile) } catch {}
      try { fs.rmdirSync(tmpDir) } catch {}
    }
  })
})