import * as path from 'path'
import * as fs from 'fs'
import * as os from 'os'
import jsonfile from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js'

describe('readFile with string encoding option', () => {
  it('should use the provided encoding when reading the file, causing parse failure for non-utf8 encoding', async () => {
    const tmpDir = os.tmpdir()
    const tmpFile = path.join(tmpDir, `test-jsonfile-encoding-${Date.now()}.json`)
    
    const testData = { hello: 'world' }
    fs.writeFileSync(tmpFile, JSON.stringify(testData), 'utf8')
    
    try {
      // With original code: options = { encoding: 'base64' }
      // fs.readFile returns base64-encoded string of the file content
      // e.g. '{"hello":"world"}' becomes 'eyJoZWxsbyI6IndvcmxkIn0='
      // JSON.parse('eyJoZWxsbyI6IndvcmxkIn0=') throws SyntaxError
      // So readFile should throw an error
      //
      // With mutated code: options = {}
      // fs.readFile returns a Buffer containing the raw bytes
      // JSON.parse(Buffer) works fine and returns { hello: 'world' }
      // So readFile should succeed
      
      await expect(jsonfile.readFile(tmpFile, 'base64')).rejects.toThrow()
    } finally {
      try { fs.unlinkSync(tmpFile) } catch (_) {}
    }
  })
})