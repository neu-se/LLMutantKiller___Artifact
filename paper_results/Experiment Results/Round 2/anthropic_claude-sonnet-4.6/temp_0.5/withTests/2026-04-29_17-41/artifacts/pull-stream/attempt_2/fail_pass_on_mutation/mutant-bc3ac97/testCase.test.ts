const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js")

describe('pull with exactly 2 through-streams in curried form', () => {
  it('correctly composes 2 through-streams and processes data when length is 2', (done) => {
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

    // pull(double, addOne) triggers the curried path with length === 2
    // In the mutated code, case 2 is missing, so it falls through incorrectly
    const pipeline = pull(double, addOne)

    // pipeline should be a function(read) that returns a readable
    const source = (_abort: any, cb: Function) => cb(null, 5)
    const read = pipeline(source)

    read(null, (end: any, data: any) => {
      expect(end).toBeFalsy()
      // double(5) = 10, addOne(10) = 11
      expect(data).toBe(11)
      done()
    })
  })
})