import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull case 2 partial application', () => {
  it('should handle partial application with 2 args where second arg is a through that returns a function', () => {
    // The key insight: in the mutant, case 2 falls through to case 3.
    // case 3 does: return pull(read, ref[0], ref[1], ref[2])
    // where ref[2] is undefined (ref only has 2 elements).
    // 
    // However, `length` in the outer pull call is 2 (from pull(through1, through2)).
    // When the partial is invoked with a source, it calls:
    //   pull(source, ref[0], ref[1], ref[2]) with 4 actual arguments
    // but `arguments.length` in that new pull call is 4, not 2.
    // So `a = source` (a function with length 2, not 1), so it goes to the non-partial path.
    // The loop runs i=1,2,3. At i=3, s=undefined, skipped.
    // Result should be same.
    //
    // BUT: what if ref[0] is a through that makes read into something,
    // and ref[1] is undefined? No, ref[1] exists.
    //
    // Let's verify the return value TYPE is correct - a function of arity 2
    
    let i = 0
    const source = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      if (i++ >= 2) return cb(true)
      cb(null, i)
    }

    const through1 = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data + 10)
      })
    }

    const through2 = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data * 2)
      })
    }

    // Create partial with exactly 2 throughs - hits case 2
    const partial = pull(through1, through2)

    // The partial should be callable only once
    const read = partial(source)

    // Calling partial again should throw TypeError
    expect(() => partial(source)).toThrow(TypeError)
  })
})