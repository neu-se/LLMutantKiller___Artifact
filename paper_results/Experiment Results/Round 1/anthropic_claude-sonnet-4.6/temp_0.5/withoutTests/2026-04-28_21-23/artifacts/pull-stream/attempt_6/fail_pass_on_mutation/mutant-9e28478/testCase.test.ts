import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("partial sink with 2 through-streams returns correct readable when applied to source", () => {
    // The mutation causes case 2 to fall through to case 3, calling
    // pull(read, ref[0], ref[1], ref[2]) where ref[2] is undefined.
    // We need a scenario where passing undefined as 4th arg causes different behavior.
    // 
    // Key: if ref[1] is a through that returns a function with length===1,
    // then after processing ref[1], read has length===1.
    // In mutated code with 4 args, i=3 runs with s=undefined - still skipped.
    // 
    // But what if ref[0] is a through that returns a function with length===1?
    // After i=1, read = ref[0](originalRead) with length===1.
    // Then i=2, s=ref[1] (a function), read = ref[1](read).
    // Then i=3 (mutated only), s=undefined, skipped.
    // Same result.
    //
    // The ONLY real difference: pull(a, b, c) vs pull(a, b, c, undefined)
    // when a.length === 1 creates a partial sink.
    // In pull(a, b, c): a.length===1 → partial sink with args=[b,c], length=3
    //   → returns function(read) { switch(3) { default: ref.unshift(read); pull.apply(null, ref) } }
    // In pull(a, b, c, undefined): a.length===1 → partial sink with args=[b,c,undefined], length=4
    //   → returns function(read) { switch(4) { default: ref.unshift(read); pull.apply(null, ref) } }
    // These are different! The partial sink captures different args!
    //
    // So if read (the source passed to partialSink) has length===1,
    // the original creates a partial sink capturing [ref[0], ref[1]]
    // and the mutated creates a partial sink capturing [ref[0], ref[1], undefined]
    // Both return functions (partial sinks), not readable streams.
    // But the original pull(source, ref[0], ref[1]) with source.length===1 also creates a partial sink!
    // So both original and mutated return functions in this case.
    //
    // I think the mutation is truly equivalent. Let me just write a basic test
    // that exercises the case 2 path and verify it works.
    
    const results: number[] = []
    
    // Standard source with length 2
    function source(end: any, cb: Function) {
      const vals = [1, 2, 3]
      let i = 0
      if (end) return cb(end)
      if (i >= vals.length) return cb(true)
      cb(null, vals[i++])
    }
    
    // Proper pull-stream source (returns a reader)
    function makeSource(vals: number[]) {
      let i = 0
      return function(end: any, cb: Function) {
        if (end) return cb(end)
        if (i >= vals.length) return cb(true)
        cb(null, vals[i++])
      }
    }
    
    function through(fn: (x: number) => number) {
      return function(read: Function) {
        return function(end: any, cb: Function) {
          read(end, function(end: any, data: any) {
            if (end) return cb(end)
            cb(null, fn(data))
          })
        }
      }
    }
    
    // Create partial sink with 2 through-streams
    const double = through((x) => x * 2)
    const addOne = through((x) => x + 1)
    
    const partialSink = pull(double, addOne)
    
    // Apply to source
    const readable = partialSink(makeSource([1, 2, 3]))
    
    expect(typeof readable).toBe('function')
    
    let done = false
    ;(function drain() {
      readable(null, function(end: any, data: any) {
        if (end === true) { done = true; return }
        if (end) throw end
        results.push(data)
        drain()
      })
    })()
    
    expect(done).toBe(true)
    // double(1)+1=3, double(2)+1=5, double(3)+1=7
    expect(results).toEqual([3, 5, 7])
  })
})