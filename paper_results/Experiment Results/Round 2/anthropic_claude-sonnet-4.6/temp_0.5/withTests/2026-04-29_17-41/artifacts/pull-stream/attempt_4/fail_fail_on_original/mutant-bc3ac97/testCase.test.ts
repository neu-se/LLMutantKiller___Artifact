const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js")

describe('pull pipeline with 3 through-streams in curried form', () => {
  it('correctly processes data through exactly 3 through-streams', (done) => {
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

    const triple = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data * 3)
      })
    }

    // length === 3: curried pull with 3 through-streams
    // mutated: case 3 is now empty (falls through), original case 2 is gone
    // In mutated code, case 3 falls through to second case 3 which returns pull(read, ref[0], ref[1], ref[2])
    // But wait - with duplicate case 3, JS only matches the FIRST case 3 (empty), falls through to second case 3 body
    // Actually this should still work... let me try a collect-based approach

    const results: number[] = []
    pull(
      pull.values([1, 2, 3]),
      pull(double, addOne, triple),
      pull.collect((err: any, ary: number[]) => {
        expect(err).toBeFalsy()
        // each value: x*2+1)*3
        expect(ary).toEqual([9, 15, 21])
        done()
      })
    )
  })
})