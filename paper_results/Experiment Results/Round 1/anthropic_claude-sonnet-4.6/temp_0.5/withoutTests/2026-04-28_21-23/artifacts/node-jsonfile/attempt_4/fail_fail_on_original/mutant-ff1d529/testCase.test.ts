import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'
import jsonfile from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js'

describe('readFileSync with string encoding option', () => {
  it('should pass encoding to fs.readFileSync when string is passed as options', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jsonfile-test-'))
    const tmpFile = path.join(tmpDir, 'test.json')
    
    try {
      fs.writeFileSync(tmpFile, JSON.stringify({ a: 1 }), 'utf8')
      
      const spy = jest.spyOn(fs, 'readFileSync')
      
      jsonfile.readFileSync(tmpFile, 'utf8')
      
      // Original: called with { encoding: 'utf8' }
      // Mutated: called with {}
      const callArgs = spy.mock.calls[0]
      expect(callArgs[1]).toEqual({ encoding: 'utf8' })
      
      spy.mockRestore()
    } finally {
      try { fs.unlinkSync(tmpFile) } catch {}
      try { fs.rmdirSync(tmpDir) } catch {}
    }
  })
})