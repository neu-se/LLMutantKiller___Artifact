import * as path from 'path'
import * as fs from 'fs'
import * as os from 'os'
import jsonfile from '../../../../../../../../../../../subject_repositories/node-jsonfile/index.js'

describe('readFileSync with string encoding option', () => {
  it('should pass encoding to fs.readFileSync when options is a string', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jsonfile-test-'))
    const tmpFile = path.join(tmpDir, 'test.json')
    
    try {
      const testData = { x: 1 }
      fs.writeFileSync(tmpFile, JSON.stringify(testData), 'utf8')
      
      // Spy on graceful-fs or fs readFileSync to check what options are passed
      // The module uses graceful-fs if available, so spy on that
      let capturedOptions: any
      const originalReadFileSync = fs.readFileSync.bind(fs)
      const spy = jest.spyOn(fs, 'readFileSync').mockImplementation((file: any, options: any) => {
        capturedOptions = options
        return originalReadFileSync(file, options)
      })
      
      jsonfile.readFileSync(tmpFile, 'utf8')
      
      // In original: options becomes { encoding: 'utf8' }, so encoding is 'utf8'
      // In mutated: options becomes {}, so encoding is undefined
      expect(capturedOptions).toHaveProperty('encoding', 'utf8')
    } finally {
      jest.restoreAllMocks()
      try { fs.unlinkSync(tmpFile) } catch {}
      try { fs.rmdirSync(tmpDir) } catch {}
    }
  })
})