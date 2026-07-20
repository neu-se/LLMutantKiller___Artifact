import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull case 2 mutation", () => {
  it("correctly handles pipeline factory with 2 args where second is a sink", (done) => {
    const results: number[] = []
    
    const double = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data * 2)
      })
    }
    
    // A sink function - consumes the stream
    const sink = (read: Function) => {
      const go = () => {
        read(null, (end: any, data: any) => {
          if (end === true) { done(); return }
          if (end) { done(end); return }
          results.push(data)
          go()
        })
      }
      go()
    }
    
    const pipeline = pull(double, sink)
    
    let idx = 0
    const values = [1, 2, 3]
    const src = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      if (idx >= values.length) return cb(true)
      cb(null, values[idx++])
    }
    
    pipeline(src)
    
    // Check results after stream completes
    setTimeout(() => {
      expect(results).toEqual([2, 4, 6])
    }, 10)
  })
})