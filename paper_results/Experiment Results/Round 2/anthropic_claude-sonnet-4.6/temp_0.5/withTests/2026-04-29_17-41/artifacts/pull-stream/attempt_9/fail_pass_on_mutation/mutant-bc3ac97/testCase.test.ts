const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js")

describe('pull with exactly 3 through-streams in curried form', () => {
  it('does not cause infinite recursion when length is 3', () => {
    const addOne = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data + 1)
      })
    }

    const double = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data * 2)
      })
    }

    const negate = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, -data)
      })
    }

    // In mutated code: case 3 falls through to case 4, calling
    // pull(read, ref[0], ref[1], ref[2], undefined)
    // length=5, hits default, ref.unshift(read), pull.apply with undefined in args
    // undefined arg is skipped in the for loop, result is correct
    // BUT the curried form: pull(addOne, double, negate) has length=3
    // when called with a source, switch hits case 3 (empty) falls to case 4
    // returns pull(read, addOne, double, negate, undefined) - length 5
    // default: ref=[addOne,double,negate,undefined], unshift(read)
    // pull(read,addOne,double,negate,undefined) - undefined skipped, works fine
    // So we need to check something else...
    // Actually let's verify the return value is a proper read function (2 args)
    const pipeline = pull(addOne, double, negate)
    expect(typeof pipeline).toBe('function')
    expect(pipeline.length).toBe(1)

    let i = 0
    const source = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      if (i++ > 0) return cb(true)
      cb(null, 3)
    }

    const read = pipeline(source)
    expect(typeof read).toBe('function')
    expect(read.length).toBe(2)
  })
})