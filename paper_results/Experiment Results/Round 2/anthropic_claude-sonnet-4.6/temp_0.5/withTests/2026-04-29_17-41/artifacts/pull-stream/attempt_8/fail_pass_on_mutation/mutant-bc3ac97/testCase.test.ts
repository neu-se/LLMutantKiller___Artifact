const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js")

describe('pull curried form with exactly 3 through-streams falls through to case 4', () => {
  it('should not pass undefined as extra stream when length is 3', (done) => {
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

    // With length===3, mutated code falls through case 3 to case 4:
    // pull(read, ref[0], ref[1], ref[2], ref[3]) where ref[3] is undefined
    // ref[3]=undefined means arguments[4]=undefined in the inner pull call
    // length becomes 5, so default runs: ref.unshift(read) on [addOne,double,negate,undefined]
    // This should cause an error since undefined is passed as a stream
    let errorCaught: any = null
    try {
      const pipeline = pull(addOne, double, negate)
      let i = 0
      const source = (abort: any, cb: Function) => {
        if (abort) return cb(abort)
        if (i++ > 0) return cb(true)
        cb(null, 3)
      }
      const read = pipeline(source)
      read(null, (end: any, data: any) => {
        expect(end).toBeFalsy()
        // Original: (3+1)*2 = 8, then -8
        expect(data).toBe(-8)
        done()
      })
    } catch(e) {
      errorCaught = e
      expect(errorCaught).toBeNull()
      done()
    }
  })
})