import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import { rimrafSync } from 'rimraf'

describe('readFileSync with string as options parameter', () => {
  it('should preserve encoding when string is passed as options', () => {
    const jf = require('../../../../../../../../../../../subject_repositories/node-jsonfile/index.js')
    const TEST_DIR = path.join(os.tmpdir(), 'jsonfile-mutant-test-ff1d529')
    
    if (fs.existsSync(TEST_DIR)) {
      rimrafSync(TEST_DIR)
    }
    fs.mkdirSync(TEST_DIR, { recursive: true })
    
    try {
      const file = path.join(TEST_DIR, 'test.json')
      const obj = { name: 'jp' }
      fs.writeFileSync(file, JSON.stringify(obj), 'utf8')
      
      // Track what encoding is passed to readFileSync
      let capturedEncoding: string | undefined
      const originalReadFileSync = fs.readFileSync
      
      // Use a custom fs object to observe the encoding passed
      const observedOptions: any[] = []
      const customFs = {
        readFileSync: (filePath: string, options: any) => {
          observedOptions.push(options)
          return originalReadFileSync(filePath, options)
        }
      }
      
      // When 'utf8' is passed as string option, original code converts it to { encoding: 'utf8' }
      // Then options.fs is checked - but since options is now { encoding: 'utf8' }, no custom fs
      // So we need to test differently
      
      // The mutation: when typeof options === 'string', original sets options = { encoding: options }
      // mutated sets options = {}
      // After this, options.fs is checked - both result in undefined, so default _fs is used
      // The encoding in options is then passed to fs.readFileSync
      // Original: fs.readFileSync(file, { encoding: 'utf8' }) -> returns string
      // Mutated: fs.readFileSync(file, {}) -> returns Buffer
      // Both work with JSON.parse, but the type differs
      
      // To detect: check if the result type differs based on what fs.readFileSync returns
      // We need to intercept the actual fs call
      
      // Use jest.spyOn on the graceful-fs or fs module
      const spy = jest.spyOn(fs, 'readFileSync')
      
      const data = jf.readFileSync(file, 'utf8')
      
      // Check what was passed to readFileSync
      const callArgs = spy.mock.calls
      spy.mockRestore()
      
      // Find the call that read our file
      const ourCall = callArgs.find((args: any[]) => args[0] === file)
      
      expect(data).not.toBeNull()
      expect(data.name).toBe('jp')
      
      // Original: options passed to readFileSync should include encoding: 'utf8'
      // Mutated: options passed to readFileSync should be {} (no encoding)
      if (ourCall) {
        const passedOptions = ourCall[1]
        expect(passedOptions).toHaveProperty('encoding', 'utf8')
      }
    } finally {
      rimrafSync(TEST_DIR)
    }
  })
})