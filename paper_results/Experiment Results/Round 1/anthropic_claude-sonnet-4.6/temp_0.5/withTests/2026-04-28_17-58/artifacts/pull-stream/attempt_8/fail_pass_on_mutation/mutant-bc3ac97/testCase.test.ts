import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull case 2 mutation", () => {
  it("pipeline factory with 2 through streams correctly chains them", (done) => {
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
    const pipeline = pull(addOne, double)
    let idx = 0
    const values = [1, 2, 3]
    const src = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      if (idx >= values.length) return cb(true)
      cb(null, values[idx++])
    }
    const read = pipeline(src)
    const results: number[] = []
    const drain = () => {
      read(null, (end: any, data: any) => {
        if (end === true) { expect(results).toEqual([4, 6, 8]); done(); return }
        if (end) { done(end); return }
        results.push(data)
        drain()
      })
    }
    drain()
  })
})