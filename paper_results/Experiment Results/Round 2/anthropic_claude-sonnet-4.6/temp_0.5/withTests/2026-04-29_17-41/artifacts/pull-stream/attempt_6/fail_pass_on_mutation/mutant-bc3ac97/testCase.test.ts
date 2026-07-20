const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js")

describe('pull curried form with exactly 3 through-streams', () => {
  it('correctly processes data through 3 through-streams without passing undefined as extra argument', (done) => {
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

    // Curried pull with exactly 3 through-streams (length === 3)
    // In mutated code, case 3 is empty and falls through to case 4,
    // calling pull(read, ref[0], ref[1], ref[2], undefined)
    // The undefined 4th argument causes s.sink to throw or misbehave
    const pipeline = pull(addOne, double, negate)

    let called = false
    const source = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      if (called) return cb(true)
      called = true
      cb(null, 5)
    }

    const read = pipeline(source)

    read(null, (end: any, data: any) => {
      expect(end).toBeFalsy()
      expect(data).toBe(-12) // (5+1)*2 = 12, then -12
      done()
    })
  })
})