const pull = require('../../../../../../../../../../../subject_repositories/pull-stream/index.js')

describe('pull', () => {
  it('does not access arguments beyond length', (done) => {
    let extraCallDetected = false
    
    // Define a getter on Object.prototype for index 3
    // (for a pull(source, through, collect) call with length=3)
    Object.defineProperty(Object.prototype, '3', {
      get() { 
        extraCallDetected = true
        return undefined
      },
      configurable: true
    })
    
    try {
      pull(
        pull.values([1, 2, 3]),
        pull.map((x: number) => x + 1),
        pull.collect((err: any, arr: number[]) => {
          expect(err).toBeNull()
          expect(arr).toEqual([2, 3, 4])
          // In original: extraCallDetected should be false (no access to arguments[3])
          // In mutated: extraCallDetected should be true (accesses arguments[3])
          expect(extraCallDetected).toBe(false)
          done()
        })
      )
    } finally {
      delete (Object.prototype as any)['3']
    }
  })
})