import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull case 2 mutation", () => {
  it("pipeline factory with 2 streams where second is a sink correctly returns undefined", (done) => {
    const results: number[] = []
    
    // through: takes read, returns new read (length=1 function)
    const double = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data * 2)
      })
    }
    
    // sink: takes read, starts draining (returns undefined)
    const collect = (read: Function) => {
      const drain = (abort?: any) => {
        read(abort || null, (end: any, data: any) => {
          if (end) { if (end !== true) done(end); else done(); return }
          results.push(data)
          drain()
        })
      }
      drain()
    }
    
    // pipeline factory with length=2
    const pipeline = pull(double, collect)
    
    let idx = 0
    const values = [1, 2, 3]
    const src = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      if (idx >= values.length) return cb(true)
      cb(null, values[idx++])
    }
    
    pipeline(src)
    
    // If mutation causes undefined to be passed as extra arg and collect is called twice, it would error
    // Actually need to check results
    setTimeout(() => {
      expect(results).toEqual([2, 4, 6])
      done()
    }, 50)
  })
})