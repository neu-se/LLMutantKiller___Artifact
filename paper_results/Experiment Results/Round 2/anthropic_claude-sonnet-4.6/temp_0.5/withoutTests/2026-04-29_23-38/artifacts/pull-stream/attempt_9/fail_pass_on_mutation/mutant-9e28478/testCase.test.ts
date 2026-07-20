import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull case 2 mutation - partial sink applied to through as source", () => {
  it("should return undefined when partial sink result is called as a stream directly", () => {
    // The partial sink with 2 args, when applied to a through (length=1),
    // returns a new partial sink (not a stream).
    // If we then try to use this as a stream (call it with end, cb),
    // it should behave as a partial sink (call it with a read function).
    
    const add1 = (read: any) => (end: any, cb: any) => {
      read(end, (e: any, d?: number) => {
        if (e) return cb(e)
        cb(null, d! + 1)
      })
    }
    // add1.length === 1

    const mul2 = (read: any) => (end: any, cb: any) => {
      read(end, (e: any, d?: number) => {
        if (e) return cb(e)
        cb(null, d! * 2)
      })
    }

    // Create partial sink with 2 args (case 2 path)
    const partial = pull(add1, mul2)
    // partial.length === 1

    // Apply partial to add1 (which has length=1)
    // Original: pull(add1, add1, mul2) - add1.length===1, enters partial sink branch
    //   creates partial sink with args=[add1, add1, mul2], length=3
    // Mutated:  pull(add1, add1, mul2, undefined) - same branch
    //   creates partial sink with args=[add1, add1, mul2, undefined], length=4
    const result = partial(add1)
    // result is a partial sink in both cases, result.length === 1

    // Now apply result to add1 again (length=1)
    // Original (length=3): pull(add1, add1, add1, mul2) - add1.length===1, partial sink branch
    //   args=[add1, add1, add1, mul2], length=4
    // Mutated (length=4): pull(add1, add1, add1, mul2, undefined) - partial sink branch
    //   args=[add1, add1, add1, mul2, undefined], length=5
    const result2 = result(add1)
    // result2 is a partial sink in both cases, result2.length === 1

    // Now apply result2 to add1 again (length=1)
    // Original (length=4): pull(add1, add1, add1, add1, mul2) - partial sink branch
    //   args=[add1, add1, add1, add1, mul2], length=5
    // Mutated (length=5): pull(add1, add1, add1, add1, mul2, undefined) - partial sink branch
    //   args=[add1, add1, add1, add1, mul2, undefined], length=6
    const result3 = result2(add1)
    // result3 is a partial sink in both cases, result3.length === 1

    // Now apply result3 to a REAL source (length=2)
    let idx = 0
    const source = (end: any, cb: (end: any, data?: number) => void) => {
      if (end) return cb(end)
      if (idx >= 2) return cb(true)
      cb(null, ++idx)
    }
    // source.length === 2

    // Original (length=5): switch(5) -> default!
    //   ref = [add1, add1, add1, add1, mul2]
    //   ref.unshift(source) -> ref = [source, add1, add1, add1, add1, mul2]
    //   pull.apply(null, ref) = pull(source, add1, add1, add1, add1, mul2)
    //   = mul2(add1(add1(add1(add1(source)))))
    //   1 -> 2 -> 3 -> 4 -> 5 -> 10
    //   2 -> 3 -> 4 -> 5 -> 6 -> 12
    //
    // Mutated (length=6): switch(6) -> default!
    //   ref = [add1, add1, add1, add1, mul2, undefined]
    //   ref.unshift(source) -> ref = [source, add1, add1, add1, add1, mul2, undefined]
    //   pull.apply(null, ref) = pull(source, add1, add1, add1, add1, mul2, undefined)
    //   = mul2(add1(add1(add1(add1(source))))) (undefined skipped)
    //   Same result!

    const stream = result3(source)
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
    expect(results).toEqual([10, 12])
  })
})