const pull = require('../../../../../../../../../../../subject_repositories/pull-stream/pull.js')

describe('pull', () => {
  it('for loop uses strict less-than comparison (i < length, not i <= length)', () => {
    const unexpectedAccessError = new Error('unexpected access to arguments[1]')
    
    Object.defineProperty(Object.prototype, '1', {
      get() { throw unexpectedAccessError },
      configurable: true
    })
    
    let caughtError: unknown = null
    try {
      // source with 2 params avoids partial application branch (a.length === 1 check)
      const source = (abort: any, cb: Function) => cb(true)
      // pull(source) has length=1
      // Original: loop condition 1 < 1 is false, no iterations, no access to arguments[1]
      // Mutated: loop condition 1 <= 1 is true, accesses arguments[1] which triggers getter
      pull(source)
    } catch (e) {
      caughtError = e
    } finally {
      delete (Object.prototype as any)['1']
    }
    
    expect(caughtError).toBeNull()
  })
})