import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("partial sink with 2 args where source has length 1 should behave correctly", () => {
    // When source.length === 1, pull(source, a, b) creates a partial sink (returns function)
    // When source.length === 1, pull(source, a, b, undefined) also creates a partial sink
    // BUT the captured args differ: [source, a, b] vs [source, a, b, undefined]
    // 
    // Original partial sink (length=3) when called with newSource:
    //   case 3: pull(newSource, source, a, b)
    //   if newSource.length !== 1: loop processes source(newSource), a, b -> returns result
    //
    // Mutated partial sink (length=4) when called with newSource:  
    //   case 4: pull(newSource, source, a, b, undefined)
    //   if newSource.length !== 1: loop processes source(newSource), a, b, undefined(skipped) -> same result
    //
    // Still equivalent! Let me try a completely different approach.
    // 
    // What if I spy on the pull function itself to count arguments?
    // Or what if I use a through-stream that throws on undefined input?
    
    let receivedUndefined = false
    
    function makeSource(vals: number[]) {
      let i = 0
      return function(end: any, cb: Function) {
        if (end) return cb(end)
        if (i >= vals.length) return cb(true)
        cb(null, vals[i++])
      }
    }
    
    // A through-stream that detects if it receives undefined as the read argument
    function detectUndefined(read: Function) {
      if (read === undefined) {
        receivedUndefined = true
        return function(end: any, cb: Function) { cb(true) }
      }
      return function(end: any, cb: Function) {
        read(end, cb)
      }
    }
    
    function double(read: Function) {
      return function(end: any, cb: Function) {
        read(end, function(end: any, data: any) {
          if (end) return cb(end)
          cb(null, data * 2)
        })
      }
    }
    
    // pull(double, detectUndefined) - partial sink with 2 args
    // When applied to source:
    // Original: pull(source, double, detectUndefined)
    //   i=1: read = double(source)
    //   i=2: read = detectUndefined(double(source)) -> read is defined, no undefined detected
    // Mutated: pull(source, double, detectUndefined, undefined)
    //   i=1: read = double(source)  
    //   i=2: read = detectUndefined(double(source)) -> still defined
    //   i=3: s = undefined -> typeof undefined !== 'function', skipped
    // detectUndefined never receives undefined in either case!
    
    const partialSink = pull(double, detectUndefined)
    const result = partialSink(makeSource([1, 2, 3]))
    
    expect(receivedUndefined).toBe(false)
    expect(typeof result).toBe('function')
    
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
    expect(collected).toEqual([2, 4, 6])
  })
})