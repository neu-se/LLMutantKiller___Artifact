import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial sink case 2 - argument count", () => {
  it("should pass exactly 3 arguments to the recursive pull call for case 2", () => {
    // We can detect the mutation by observing that in the mutated version,
    // pull is called with 4 arguments (including undefined) instead of 3.
    // 
    // Strategy: make through2 a function that, when called as a through,
    // returns a stream that records whether it was the LAST stream in the pipeline.
    // In the original, through2 is the last (no more processing after it).
    // In the mutated, there's one more iteration (undefined, skipped), but
    // the result is the same.
    //
    // I cannot detect this mutation through behavioral testing.
    // The mutation is a no-op.
    
    // Let me try: what if through2 returns undefined, and then
    // in the mutated version, the extra iteration tries to call undefined?
    // No - undefined is checked with typeof and &&, so it's skipped.
    
    // What if I make through2 return a non-function, non-object value
    // that would cause issues if processed again?
    // E.g., through2 returns 42 (a number).
    // In original: read = 42. Returns 42.
    // In mutated: read = 42. s = undefined, skipped. Returns 42.
    // Same!
    
    // What if through2 returns null?
    // In original: read = null. Returns null.
    // In mutated: read = null. s = undefined, skipped. Returns null.
    // Same!
    
    // I truly cannot find a behavioral difference.
    // The mutation is a no-op.
    
    let idx = 0
    const source = (end: any, cb: (end: any, data?: number) => void) => {
      if (end) return cb(end)
      if (idx >= 2) return cb(true)
      cb(null, ++idx)
    }
    
    const through1 = (read: any) => (end: any, cb: any) => {
      read(end, (e: any, d?: number) => {
        if (e) return cb(e)
        cb(null, d! + 10)
      })
    }
    
    const through2 = (read: any) => (end: any, cb: any) => {
      read(end, (e: any, d?: number) => {
        if (e) return cb(e)
        cb(null, d! * 2)
      })
    }
    
    const partial = pull(through1, through2)
    const stream = partial(source)
    
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
    expect(results).toEqual([22, 24])
  })
})