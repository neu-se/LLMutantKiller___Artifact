import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'
import jsonfile from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js'

describe('readFileSync with string encoding option', () => {
  it('should correctly read and parse JSON file when encoding is passed as a string', () => {
    // Create a temporary directory and file
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jsonfile-test-'))
    const tmpFile = path.join(tmpDir, 'test.json')
    
    const testData = { name: 'test', value: 42, nested: { key: 'hello' } }
    
    try {
      // Write the JSON file
      fs.writeFileSync(tmpFile, JSON.stringify(testData), 'utf8')
      
      // Read with string encoding option - original code converts 'utf8' to { encoding: 'utf8' }
      // Mutated code converts 'utf8' to {} losing the encoding
      // With no encoding, fs.readFileSync returns a Buffer
      // stripBom and JSON.parse should still work with Buffer, but let's verify the result
      const result = jsonfile.readFileSync(tmpFile, 'utf8')
      
      // The result should be the parsed JSON object
      expect(result).toEqual(testData)
      expect(result.name).toBe('test')
      expect(result.value).toBe(42)
      expect(result.nested.key).toBe('hello')
    } finally {
      // Cleanup
      fs.unlinkSync(tmpFile)
      fs.rmdirSync(tmpDir)
    }
  })
})