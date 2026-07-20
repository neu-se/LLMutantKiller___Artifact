import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'
import jsonfile from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js'

describe('readFileSync with string encoding option', () => {
  it('should correctly parse JSON with non-ASCII characters when encoding string is passed', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jsonfile-test-'))
    const tmpFile = path.join(tmpDir, 'test.json')
    
    try {
      const testData = { name: 'héllo wörld', emoji: '🎉' }
      fs.writeFileSync(tmpFile, JSON.stringify(testData), 'utf8')
      
      // Original: encoding preserved, returns string
      // Mutation: encoding lost, returns Buffer - JSON.parse(Buffer) might handle this differently
      const result = jsonfile.readFileSync(tmpFile, 'utf8')
      expect(result).toEqual(testData)
      expect(result.name).toBe('héllo wörld')
    } finally {
      try { fs.unlinkSync(tmpFile) } catch {}
      try { fs.rmdirSync(tmpDir) } catch {}
    }
  })
})