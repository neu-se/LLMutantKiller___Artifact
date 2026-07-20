import * as path from 'path'
import * as os from 'os'
import * as fs from 'fs'

describe('jsonfile graceful-fs fallback', () => {
  it('should use fs as fallback when graceful-fs is unavailable', () => {
    // Must reset modules first, then mock
    jest.resetModules()
    jest.mock('graceful-fs', () => { throw new Error('not found') })
    
    const TEST_DIR = path.join(os.tmpdir(), 'jsonfile-fallback-test-' + process.pid)
    fs.mkdirSync(TEST_DIR, { recursive: true })
    const file = path.join(TEST_DIR, 'test.json')
    fs.writeFileSync(file, JSON.stringify({ x: 1 }))
    
    let result: any
    let error: any
    try {
      // This require happens AFTER jest.mock, so graceful-fs throws
      const jf = require('../../../../../../../../../../../subject_repositories/node-jsonfile/index.js')
      result = jf.readFileSync(file)
    } catch (e) {
      error = e
    } finally {
      fs.rmSync(TEST_DIR, { recursive: true, force: true })
      jest.resetModules()
      jest.unmock('graceful-fs')
    }
    
    // Original: falls back to fs, works fine
    // Mutated: _fs is undefined, throws TypeError
    expect(error).toBeUndefined()
    expect(result).toEqual({ x: 1 })
  })
})