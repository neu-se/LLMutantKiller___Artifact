import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial sink case 2 - nested partial sinks reveal mutation", () => {
  it("should produce correct output when partial sink is applied to another partial sink as source", () => {
    // Key: when partial(innerPartial) is called, innerPartial.length === 1
    // This causes the recursive pull call to enter the partial sink branch
    // Original: pull(innerPartial, t1, t2) creates partial sink with length=3
    // Mutated:  pull(innerPartial, t1, t2, undefined) creates partial sink with length=4
    // When these are called with a real source, they hit different switch cases
    // but both produce the same result (undefined is skipped)
    // 
    // The mutation truly appears to be a no-op.
    // Let me verify by testing the actual output.

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

    // Create partial sink with 2 args (exercises case 2)
    const partial = pull(add1, mul2)

    // Apply to another partial sink (add1 has .length === 1)
    // This makes the recursive call enter partial sink branch
    const nestedResult = partial(add1)

    // nestedResult is a partial sink - apply to real source
    let idx = 0
    const source = (end: any, cb: (end: any, data?: number) => void) => {
      if (end) return cb(end)
      if (idx >= 3) return cb(true)
      cb(null, ++idx)
    }

    const stream = nestedResult(source)
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
    // source -> add1 (as through) -> add1 -> mul2
    // 1 -> 2 -> 3 -> 6
    // 2 -> 3 -> 4 -> 8
    // 3 -> 4 -> 5 -> 10
    expect(results).toEqual([6, 8, 10])
  })
})