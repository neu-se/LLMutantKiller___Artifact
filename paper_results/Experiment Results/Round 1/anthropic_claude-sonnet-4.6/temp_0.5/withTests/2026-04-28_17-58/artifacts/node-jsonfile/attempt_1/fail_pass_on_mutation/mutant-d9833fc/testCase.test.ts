import * as path from 'path'
import * as os from 'os'
import * as fs from 'fs'

describe('jsonfile fallback to fs when graceful-fs is unavailable', () => {
  it('should successfully read a JSON file even when graceful-fs throws on require', () => {
    // Make graceful-fs unavailable by mocking it to throw
    jest.mock('graceful-fs', () => {
      throw new Error('graceful-fs not available')
    })

    // Clear the cached module so it gets re-evaluated with our mock
    jest.resetModules()

    const TEST_DIR = path.join(os.tmpdir(), 'jsonfile-mutation-test-' + Date.now())
    fs.mkdirSync(TEST_DIR, { recursive: true })

    const file = path.join(TEST_DIR, 'test.json')
    const obj = { name: 'test', value: 42 }
    fs.writeFileSync(file, JSON.stringify(obj))

    try {
      // Re-require jsonfile after mocking graceful-fs
      // Original: _fs falls back to require('fs'), works fine
      // Mutated: _fs remains undefined, readFileSync will throw TypeError
      const jf = require('../../../../../../../../../../../subject_repositories/node-jsonfile/index.js')
      
      const result = jf.readFileSync(file)
      
      // Original code: this should succeed because it fell back to 'fs'
      expect(result).toEqual(obj)
    } finally {
      fs.rmSync(TEST_DIR, { recursive: true, force: true })
      jest.unmock('graceful-fs')
      jest.resetModules()
    }
  })
})