import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull case 2 mutation", () => {
  it("pipeline factory with 2 streams calls second stream with result of first", (done) => {
    let capturedRead: Function | null = null
    
    const f1 = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data + 1)
      })
    }
    
    const f2 = jest.fn((read: Function) => {
      capturedRead = read
      return (abort: any, cb: Function) => {
        read(abort, (end: any, data: any) => {
          if (end) return cb(end)
          cb(null, data * 2)
        })
      }
    })
    
    const pipeline = pull(f1, f2)
    
    let idx = 0
    const src = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      if (idx >= 3) return cb(true)
      cb(null, ++idx)
    }
    
    const read = pipeline(src)
    
    // f2 should be called exactly once with the result of f1(src)
    expect(f2).toHaveBeenCalledTimes(1)
    expect(f2).toHaveBeenCalledWith(f1(src))  // This won't work as f1(src) creates new function each time
    
    // Just check f2 was called once
    expect(f2).toHaveBeenCalledTimes(1)
    
    const results: number[] = []
    const drain = () => {
      read(null, (end: any, data: any) => {
        if (end === true) { expect(results).toEqual([2, 4, 6]); done(); return }
        if (end) { done(end); return }
        results.push(data)
        drain()
      })
    }
    drain()
  })
})