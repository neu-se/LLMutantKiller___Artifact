import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial sink case 2 - deep nesting with length-1 sources", () => {
  it("should produce correct results with deeply nested partial sinks", () => {
    // Create through streams (all have .length === 1)
    const add1 = (read: any) => (end: any, cb: any) => {
      read(end, (e: any, d?: number) => {
        if (e) return cb(e)
        cb(null, d! + 1)
      })
    }
    
    const mul2 = (read: any) => (end: any, cb: any) => {
      read(end, (e: any, d?: number) => {
        if (e) return cb(e)
        cb(null, d! * 2)
      })
    }
    
    // Create partial sink with 2 args
    const partial = pull(add1, mul2)
    // partial.length === 1
    
    // Apply partial to add1 (length=1) - enters partial sink branch
    // Original: pull(add1, add1, mul2) with add1.length=1 → partial sink (length=3)
    // Mutated:  pull(add1, add1, mul2, undefined) with add1.length=1 → partial sink (length=4)
    const nestedPartial = partial(add1)
    // nestedPartial.length === 1
    
    // Apply nestedPartial to add1 (length=1) - enters partial sink branch again
    // Original (length=3): pull(add1, add1, add1, mul2) with add1.length=1 → partial sink (length=4)
    // Mutated (length=4): pull(add1, add1, add1, mul2, undefined) with add1.length=1 → partial sink (length=5)
    const deepPartial = nestedPartial(add1)
    // deepPartial.length === 1
    
    // Now apply deepPartial to a real source (length=2)
    let idx = 0
    const source = (end: any, cb: (end: any, data?: number) => void) => {
      if (end) return cb(end)
      if (idx >= 2) return cb(true)
      cb(null, ++idx)
    }
    
    // Original (length=4): switch(4): pull(source, add1, add1, add1, mul2)
    //   = mul2(add1(add1(add1(source))))
    //   1 -> 2 -> 3 -> 4 -> 8
    //   2 -> 3 -> 4 -> 5 -> 10
    //
    // Mutated (length=5): switch(5) → default!
    //   ref = [add1, add1, add1, mul2, undefined]
    //   ref.unshift(source) → ref = [source, add1, add1, add1, mul2, undefined]
    //   pull.apply(null, ref) = pull(source, add1, add1, add1, mul2, undefined)
    //   = mul2(add1(add1(add1(source)))) (undefined skipped)
    //   Same result!
    
    const stream = deepPartial(source)
    
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
    expect(results).toEqual([8, 10])
  })
})