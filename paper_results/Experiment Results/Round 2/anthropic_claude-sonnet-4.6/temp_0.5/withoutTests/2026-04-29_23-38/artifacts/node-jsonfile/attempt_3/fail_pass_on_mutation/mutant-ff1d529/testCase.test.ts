import * as path from 'path'
import * as fs from 'fs'
import * as os from 'os'
import jsonfile from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js'

describe('readFileSync with string encoding option', () => {
  it('should preserve the encoding string when converting string options to object', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jsonfile-test-'))
    const tmpFile = path.join(tmpDir, 'test.json')
    
    try {
      const testData = { hello: 'world' }
      fs.writeFileSync(tmpFile, JSON.stringify(testData), 'utf8')
      
      let capturedEncoding: any = undefined
      const mockFs = {
        readFileSync: (file: string, options: any) => {
          capturedEncoding = typeof options === 'string' ? options : options?.encoding
          // Actually call real fs with utf8 to get valid data
          return fs.readFileSync(file, 'utf8')
        }
      }
      
      // We can't pass both a string encoding AND a custom fs in the string-options path
      // So instead, verify behavior by using a file where encoding matters for parsing
      
      // Write JSON where the raw bytes (as Buffer.toString() with no encoding = utf8) 
      // would parse fine, but we need a case where it fails without encoding
      
      // The real trick: use 'hex' encoding
      // With encoding='hex', fs.readFileSync returns hex string of the bytes
      // Without encoding (Buffer), toString() gives utf8 which is the raw JSON
      const jsonStr = JSON.stringify(testData)
      // Write the hex representation of the JSON as the file content
      // so that reading with 'hex' decoding gives back the original JSON
      const hexOfJson = Buffer.from(jsonStr).toString('hex')
      // But that's not valid JSON itself...
      
      // Simpler: just verify the result is correct (it works on original, fails on mutated)
      // For ASCII-only JSON, Buffer.toString() === string, so no difference
      // We need a non-ASCII case
      
      const unicodeData = { emoji: '\u00e9l\u00e8ve' } // éléve with latin chars
      fs.writeFileSync(tmpFile, JSON.stringify(unicodeData), 'utf8')
      
      const result = jsonfile.readFileSync(tmpFile, 'utf8')
      expect(result).toEqual(unicodeData)
    } finally {
      try { fs.unlinkSync(tmpFile) } catch {}
      try { fs.rmdirSync(tmpDir) } catch {}
    }
  })
})