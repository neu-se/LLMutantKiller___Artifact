import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull with duplex stream object as first argument', () => {
  it('should extract source from a duplex-style object passed as first argument', (done) => {
    const values = [1, 2, 3]
    let i = 0

    // A duplex-style object with a source function
    const duplexLike = {
      sink: (_read: Function) => { /* no-op */ },
      source: (abort: any, cb: Function) => {
        if (abort) return cb(abort)
        if (i >= values.length) return cb(true)
        cb(null, values[i++])
      }
    }

    // In original code: when first arg has a .source function, read is set to duplexLike.source
    // In mutated code: the branch is `if (false)`, so read remains duplexLike (the object)
    // pull(duplexLike) with no other args should return the source read function
    const readFn = pull(duplexLike)

    // In original: readFn is duplexLike.source (a function with arity 2)
    // In mutated: readFn is duplexLike (an object), typeof would not be 'function'
    expect(typeof readFn).toBe('function')

    const collected: number[] = []

    readFn(null, function next(end: any, data: any) {
      if (end === true) {
        expect(collected).toEqual([1, 2, 3])
        done()
        return
      }
      if (end) {
        done(end)
        return
      }
      collected.push(data)
      readFn(null, next)
    })
  })
})