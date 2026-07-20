import * as path from 'path'
import * as os from 'os'
import * as fs from 'fs'

describe('jsonfile graceful-fs fallback behavior', () => {
  it('should fall back to built-in fs module when graceful-fs is unavailable', () => {
    jest.resetModules()
    
    // Use jest.doMock to mock graceful-fs so that requiring it throws
    // This simulates graceful-fs not being installed
    jest.doMock('graceful-fs', () => {
      throw new Error('Cannot find module graceful-fs')
    })

    const TEST_DIR = path.join(os.tmpdir(), 'jsonfile-mutation-test-fallback')
    fs.mkdirSync(TEST_DIR, { recursive: true })
    const file = path.join(TEST_DIR, 'data.json')
    const obj = { hello: 'world' }
    fs.writeFileSync(file, JSON.stringify(obj))

    try {
      const jf = require('../../../../../../../../../../../subject_repositories/node-jsonfile/index.js')
      const result = jf.readFileSync(file)
      expect(result).toEqual(obj)
    } finally {
      fs.rmSync(TEST_DIR, { recursive: true, force: true })
      jest.resetModules()
    }
  })
})