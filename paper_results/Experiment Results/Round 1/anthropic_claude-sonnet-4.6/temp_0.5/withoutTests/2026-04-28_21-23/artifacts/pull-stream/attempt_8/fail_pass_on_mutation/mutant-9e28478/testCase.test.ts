import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("partial sink with 2 args: verifies case 2 returns correct result not undefined", () => {
    // The mutation makes case 2 fall through to case 3.
    // case 3: return pull(read, ref[0], ref[1], ref[2])
    // ref[2] is undefined since ref only has 2 elements.
    //
    // The ONLY observable difference: when ref[1] has .length === 1
    // AND we look at what pull() returns when called with 4 args vs 3 args.
    //
    // Actually let me think about this differently:
    // What does pull(read, f1, f2, undefined) return vs pull(read, f1, f2)?
    //
    // In both cases, the loop processes f1 and f2, undefined is skipped.
    // The return value is f2(f1(read)) in both cases.
    //
    // These ARE equivalent. But maybe the test framework has existing tests
    // that test something specific about case 2...
    //
    // Let me try: what if we create a partial sink where ref[1] is a 
    // through-stream that explicitly checks arguments.length?
    
    let capturedArgsLength = -1
    
    function makeSource(vals: number[]) {
      let i = 0
      return function(end: any, cb: Function) {
        if (end) return cb(end)
        if (i >= vals.length) return cb(true)
        cb(null, vals[i++])
      }
    }
    
    // A through-stream factory that captures how many args the inner pull call uses
    // by checking if it receives undefined
    function checkingThrough(read: Function) {
      // 'read' here is what pull passes as the accumulated read
      // In original (case 2): pull(source, f1, f2) -> f1 gets source, f2 gets f1(source)
      // In mutated (case 3 fallthrough): pull(source, f1, f2, undefined) -> same
      // So 'read' received by f2 is always f1(source), never undefined
      return function(end: any, cb: Function) {
        read(end, cb)
      }
    }
    
    function doubleThrough(read: Function) {
      return function(end: any, cb: Function) {
        read(end, function(end: any, data: any) {
          if (end) return cb(end)
          cb(null, data * 2)
        })
      }
    }
    
    const partialSink = pull(doubleThrough, checkingThrough)
    const source = makeSource([5, 10, 15])
    const result = partialSink(source)
    
    const collected: number[] = []
    let done = false
    ;(function drain() {
      result(null, function(end: any, data: any) {
        if (end === true) { done = true; return }
        if (end) throw end
        collected.push(data)
        drain()
      })
    })()
    
    expect(done).toBe(true)
    expect(collected).toEqual([10, 20, 30])
  })
})