import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial sink case 2 - source with length 1", () => {
  it("should handle source with length 1 correctly", () => {
    // Create a through stream (length=1) to use as "source"
    const throughAsSource = (read: any) => (end: any, cb: any) => {
      read(end, cb)
    }
    // throughAsSource.length === 1!
    
    const double = (read: any) => (end: any, cb: any) => {
      read(end, (e: any, d?: number) => {
        if (e) return cb(e)
        cb(null, d! * 2)
      })
    }
    
    const addTen = (read: any) => (end: any, cb: any) => {
      read(end, (e: any, d?: number) => {
        if (e) return cb(e)
        cb(null, d! + 10)
      })
    }
    
    const partial = pull(double, addTen)
    
    // Apply partial to throughAsSource (which has .length === 1)
    // This triggers the partial sink branch in the recursive call
    const result = partial(throughAsSource)
    
    // In original: pull(throughAsSource, double, addTen)
    //   a = throughAsSource, a.length === 1 → PARTIAL SINK BRANCH!
    //   args = [throughAsSource, double, addTen], length = 3
    //   Returns a new partial sink newP
    //
    // In mutated: pull(throughAsSource, double, addTen, undefined)
    //   a = throughAsSource, a.length === 1 → PARTIAL SINK BRANCH!
    //   args = [throughAsSource, double, addTen, undefined], length = 4
    //   Returns a DIFFERENT partial sink newPMutated
    
    // result.length should be 1 in both cases (it's a partial sink)
    expect(typeof result).toBe('function')
    expect(result.length).toBe(1)
    
    // Now apply result to a real source
    let idx = 0
    const realSource = (end: any, cb: (end: any, data?: number) => void) => {
      if (end) return cb(end)
      if (idx >= 3) return cb(true)
      cb(null, ++idx)
    }
    
    // result(realSource) should produce a stream
    // In original: newP(realSource) = switch(3): pull(realSource, throughAsSource, double, addTen)
    //   a = realSource (length=2), loop:
    //   i=1: s = throughAsSource (function, length=1), read = throughAsSource(realSource)
    //     throughAsSource(realSource) = (end, cb) => realSource(end, cb)
    //   i=2: s = double, read = double(throughAsSource(realSource))
    //   i=3: s = addTen, read = addTen(double(throughAsSource(realSource)))
    //   Returns addTen(double(throughAsSource(realSource)))
    //
    // In mutated: newPMutated(realSource) = switch(4): pull(realSource, throughAsSource, double, addTen, undefined)
    //   Same loop, plus undefined skipped
    //   Returns addTen(double(throughAsSource(realSource)))
    
    const stream = result(realSource)
    
    const results: number[] = []
    let done = false
    
    const next = () => {
      stream(null, (end: any, val?: number) => {
        if (end === true) { done = true; return }
        if (end) throw end
        results.push(val!)
        next()
      })
    }
    next()
    
    expect(done).toBe(true)
    // throughAsSource passes through, double doubles, addTen adds 10
    // 1 -> 1 -> 2 -> 12
    // 2 -> 2 -> 4 -> 14
    // 3 -> 3 -> 6 -> 16
    expect(results).toEqual([12, 14, 16])
  })
})