import { default as pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull', () => {
  it('partial sink with 4 through functions called with a length-1 read function should return a readable, not another partial sink', (done) => {
    const t1 = (read: Function) => (abort: any, cb: Function) =>
      read(abort, (end: any, data: any) => end ? cb(end) : cb(null, data + 1))
    const t2 = (read: Function) => (abort: any, cb: Function) =>
      read(abort, (end: any, data: any) => end ? cb(end) : cb(null, data * 2))
    const t3 = (read: Function) => (abort: any, cb: Function) =>
      read(abort, (end: any, data: any) => end ? cb(end) : cb(null, data - 1))
    const t4 = (read: Function) => (abort: any, cb: Function) =>
      read(abort, (end: any, data: any) => end ? cb(end) : cb(null, data * 3))

    // partial sink with 4 through functions
    const partialSink = pull(t1, t2, t3, t4)

    // source with length 1 - this is the key!
    // Original (case 4): pull(read, t1, t2, t3, t4) - read is first arg, not treated as through
    // Mutated (default): pull.apply(null, [read, t1, t2, t3, t4]) where read.length===1
    //   -> pull sees a.length===1, creates another partial sink instead of piping!
    let called = false
    const source = function(cb: Function) {  // length === 1
      if (called) return cb(true)
      called = true
      cb(null, 5)
    }

    const result = partialSink(source)
    // In original: result is a readable (chained through all 4 transforms), length === 2
    // In mutated: result is another partial sink (length === 1) because source.length===1
    expect(typeof result).toBe('function')
    expect((result as Function).length).toBe(2)
    done()
  })
})