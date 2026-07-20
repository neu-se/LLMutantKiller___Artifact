import * as path from 'path'
import * as os from 'os'
import * as fs from 'fs'
import * as Module from 'module'

describe('jsonfile graceful-fs fallback behavior', () => {
  it('should fall back to built-in fs module when graceful-fs is unavailable', () => {
    // Clear module cache
    jest.resetModules()
    
    // Find and temporarily remove graceful-fs from cache, 
    // and register a broken version
    const gracefulFsPath = require.resolve('graceful-fs')
    const originalCacheEntry = require.cache[gracefulFsPath]
    
    // Replace with a module that throws when accessed
    delete require.cache[gracefulFsPath]
    
    // Insert a fake broken module
    require.cache[gracefulFsPath] = {
      id: gracefulFsPath,
      filename: gracefulFsPath,
      loaded: true,
      exports: {},
      parent: null,
      children: [],
      paths: [],
      get exports() { throw new Error('graceful-fs unavailable') }
    } as any

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
      // Restore
      if (originalCacheEntry) {
        require.cache[gracefulFsPath] = originalCacheEntry
      } else {
        delete require.cache[gracefulFsPath]
      }
      fs.rmSync(TEST_DIR, { recursive: true, force: true })
      jest.resetModules()
    }
  })
})