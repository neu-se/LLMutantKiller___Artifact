import * as path from 'path'
import * as os from 'os'
import * as fs from 'fs'

describe('jsonfile graceful-fs fallback', () => {
  it('should use fs as fallback when graceful-fs is unavailable', () => {
    const TEST_DIR = path.join(os.tmpdir(), 'jsonfile-fallback-' + process.pid)
    fs.mkdirSync(TEST_DIR, { recursive: true })
    const file = path.join(TEST_DIR, 'test.json')
    fs.writeFileSync(file, JSON.stringify({ x: 1 }))

    let result: any
    let caughtError: any

    jest.isolateModules(() => {
      // Override require in a way that makes graceful-fs throw
      const originalRequire = Module.prototype.require
      // Patch at the prototype level
      ;(Module as any).prototype.require = function(id: string) {
        if (id === 'graceful-fs') throw new Error('not found')
        return originalRequire.call(this, id)
      }
      
      try {
        const jf = require('../index.js')
        result = jf.readFileSync(file)
      } catch(e) {
        caughtError = e
      } finally {
        ;(Module as any).prototype.require = originalRequire
      }
    })

    fs.rmSync(TEST_DIR, { recursive: true, force: true })
    
    expect(caughtError).toBeUndefined()
    expect(result).toEqual({ x: 1 })
  })
})