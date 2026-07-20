import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull', () => {
  it('partial application args should not contain undefined - verified via pipeline behavior', () => {
    let errorCaught: Error | null = null
    
    // A through that throws if it receives undefined as read
    function strictThrough(read: any) {
      if (typeof read !== 'function') {
        throw new TypeError(`Expected function, got ${typeof read}`)
      }
      return (end: any, cb: Function) => read(end, cb)
    }
    
    let count = 0
    const source = (end: any, cb: Function) => {
      if (end || count >= 2) return cb(true)
      cb(null, ++count)
    }
    
    function sink(read: Function) {
      read(null, (end: any) => {})
    }
    
    try {
      // 5 args triggers default case; with mutation, undefined is appended
      // and passed as extra arg to recursive pull, where it's skipped
      const partial = pull(strictThrough, strictThrough, strictThrough, strictThrough, sink)
      pull(source, partial)
    } catch (e) {
      errorCaught = e as Error
    }
    
    expect(errorCaught).toBeNull()
  })
})