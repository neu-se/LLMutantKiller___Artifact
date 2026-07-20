import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'
import jsonfile from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js'

describe('readFileSync with string encoding option', () => {
  it('should apply hex encoding when hex string is passed as options, resulting in unparseable content', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jsonfile-test-'))
    const tmpFile = path.join(tmpDir, 'test.json')
    
    try {
      fs.writeFileSync(tmpFile, JSON.stringify({ a: 1 }), 'utf8')
      
      // Original: options = { encoding: 'hex' }, readFileSync returns hex string "7b2261223a317d"
      //           JSON.parse("7b2261223a317d") throws SyntaxError
      // Mutated:  options = {}, readFileSync returns Buffer, JSON.parse(Buffer) succeeds
      expect(() => jsonfile.readFileSync(tmpFile, 'hex')).toThrow()
    } finally {
      try { fs.unlinkSync(tmpFile) } catch {}
      try { fs.rmdirSync(tmpDir) } catch {}
    }
  })
})