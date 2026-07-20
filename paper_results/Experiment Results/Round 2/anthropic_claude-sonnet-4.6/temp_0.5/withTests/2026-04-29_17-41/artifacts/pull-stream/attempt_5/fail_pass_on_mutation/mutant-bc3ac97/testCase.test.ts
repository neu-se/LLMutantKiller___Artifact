const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js")

describe('pull curried form with 2 through-streams', () => {
  it('returns undefined when length is 2 due to missing case 2 in mutated code', (done) => {
    const through1 = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data + 10)
      })
    }

    const through2 = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data + 100)
      })
    }

    // Curried pull with exactly 2 args, each of length 1
    const pipeline = pull(through1, through2)

    let i = 0
    const source = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      if (i++ > 0) return cb(true)
      cb(null, 1)
    }

    const read = pipeline(source)

    read(null, (end: any, data: any) => {
      expect(end).toBeFalsy()
      expect(data).toBe(111) // 1 + 10 + 100
      done()
    })
  })
})