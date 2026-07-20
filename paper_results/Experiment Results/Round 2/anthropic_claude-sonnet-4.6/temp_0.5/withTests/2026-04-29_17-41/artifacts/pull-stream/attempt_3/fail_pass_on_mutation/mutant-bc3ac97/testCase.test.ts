const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js")

describe('pull curried pipeline with 2 through-streams called twice', () => {
  it('throws TypeError on second invocation when length is 2', () => {
    const double = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data * 2)
      })
    }

    const addOne = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data + 1)
      })
    }

    const pipeline = pull(double, addOne)
    const source = (_abort: any, cb: Function) => cb(null, 5)

    pipeline(source)

    // Second call should throw TypeError
    expect(() => pipeline(source)).toThrow(TypeError)
  })
})