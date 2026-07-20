import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull case 2 mutation", () => {
  it("pipeline factory with 3 through streams correctly chains all three", (done) => {
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
    const triple = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data * 3)
      })
    }
    
    // length=3 triggers case 3
    const pipeline = pull(addOne, double, triple)
    
    let idx = 0
    const src = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      if (idx >= 3) return cb(true)
      cb(null, ++idx)
    }
    
    const read = pipeline(src)
    const results: number[] = []
    const drain = () => {
      read(null, (end: any, data: any) => {
        if (end === true) {
          // (1+1)*2*3=12, (2+1)*2*3=18, (3+1)*2*3=24
          expect(results).toEqual([12, 18, 24])
          done()
          return
        }
        if (end) { done(end); return }
        results.push(data)
        drain()
      })
    }
    drain()
  })
})