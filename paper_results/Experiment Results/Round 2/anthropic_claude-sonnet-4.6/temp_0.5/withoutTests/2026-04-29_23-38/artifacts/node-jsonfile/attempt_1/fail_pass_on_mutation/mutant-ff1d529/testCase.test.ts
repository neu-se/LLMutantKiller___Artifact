import * as path from 'path'
import * as fs from 'fs'
import * as os from 'os'
import jsonfile from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js'

describe('readFileSync with string encoding option', () => {
  it('should correctly read a JSON file when encoding is passed as a string', () => {
    // Create a temporary directory and file
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jsonfile-test-'))
    const tmpFile = path.join(tmpDir, 'test.json')
    
    try {
      // Write a JSON file with known content
      const testData = { name: 'test', value: 42 }
      fs.writeFileSync(tmpFile, JSON.stringify(testData), 'utf8')
      
      // Read the file using readFileSync with encoding as a string
      // In the original code: options = { encoding: 'utf8' }
      // In the mutated code: options = {} (encoding is lost)
      // When encoding is lost, fs.readFileSync returns a Buffer instead of string
      // JSON.parse can handle Buffer in some cases, but the key difference is
      // that with no encoding, the behavior changes
      const result = jsonfile.readFileSync(tmpFile, 'utf8')
      
      // The result should be the parsed JSON object
      expect(result).toEqual(testData)
      expect(result.name).toBe('test')
      expect(result.value).toBe(42)
    } finally {
      // Cleanup
      fs.unlinkSync(tmpFile)
      fs.rmdirSync(tmpDir)
    }
  })
})