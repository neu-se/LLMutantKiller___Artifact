import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull - partial sink with 2 args applied to length-1 source produces correct pipeline", () => {
  it("should produce correct output when partial sink with 2 args is applied to a through-stream as source", () => {
    // A through-stream has .length === 1
    // When used as "source" to the partial sink, the recursive pull call
    // enters the partial sink branch (since a.length === 1)
    // Original: pull(through_source, t1, t2) -> partial sink with length=3
    // Mutated:  pull(through_source, t1, t2, undefined) -> partial sink with length=4
    // These create different partial sinks!
    // When called with a real source:
    // Original (length=3): switch(3) -> pull(realSource, through_source, t1, t2)
    // Mutated  (length=4): switch(4) -> pull(realSource, through_source, t1, t2, undefined)
    // Both produce same result (undefined skipped)... still no-op
    
    // I need a deeper nesting to find the difference.
    // Let me try: what if the resulting partial sink is called with ANOTHER through as source?
    
    let idx = 0
    const realSource = (end: any, cb: (end: any, data?: number) => void) => {
      if (end) return cb(end)
      if (idx >= 3) return cb(true)
      cb(null, ++idx)
    }

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

    // add1.length === 1 (it's a through stream)
    const partial = pull(add1, mul2)
    
    // partial(add1) - passing add1 (length=1) as source
    // This enters partial sink branch in recursive call
    const nestedPartial = partial(add1)
    
    // nestedPartial is a partial sink
    // nestedPartial(realSource) should produce:
    // Original (length=3): pull(realSource, add1, add1, mul2)
    //   = mul2(add1(add1(realSource)))
    //   values: 1->2->3->6, 2->3->4->8, 3->4->5->10
    // Mutated (length=4): pull(realSource, add1, add1, mul2, undefined)
    //   = mul2(add1(add1(realSource))) (undefined skipped)
    //   Same!
    
    const stream = nestedPartial(realSource)
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
    expect(results).toEqual([6, 8, 10])
  })
})