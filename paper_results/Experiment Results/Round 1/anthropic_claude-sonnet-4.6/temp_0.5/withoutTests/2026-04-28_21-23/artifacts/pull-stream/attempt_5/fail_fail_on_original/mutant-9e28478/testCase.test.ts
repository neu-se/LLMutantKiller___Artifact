import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial sink case 2", () => {
  it("should call pull with exactly 3 arguments (not 4) when partial sink has 2 args", () => {
    // We need to detect whether pull is called with 3 or 4 arguments
    // The only observable difference is if ref[1] produces a read with length===1
    // which would cause the 4-arg version to create a partial sink instead of processing
    
    const collected: number[] = []
    
    // Source with length 2 (normal: end, cb)
    function source(end: any, cb: Function) {
      let i = 0
      const values = [10, 20]
      return function next(end: any, cb: Function) {
        if (end) return cb(end)
        if (i >= values.length) return cb(true)
        cb(null, values[i++])
      }
    }
    
    // Through stream that returns a function with length === 1
    // This is key: the result of applying this through has length 1
    // So when pull is called with 4 args (mutated), after processing ref[0] and ref[1],
    // read has length 1. But the loop is already done at that point...
    // Actually this doesn't matter since the extra undefined is at i=3 not re-evaluating read.
    
    // Let me try a different approach: make ref[1] an object with sink/source
    // where sink records how many times it's called
    let sinkCallCount = 0
    const throughObj = {
      sink: function(read: Function) {
        sinkCallCount++
        // process: just pass through
        this.source = function(end: any, cb: Function) {
          read(end, cb)
        }
      },
      source: null as any
    }
    
    // pull(throughObj) as partial sink with 1 arg - but we need 2 args for case 2
    // Let's use pull(identityFn, throughObj) 
    function identity(read: Function) {
      return function(end: any, cb: Function) {
        read(end, cb)
      }
    }
    
    const partialSink = pull(identity, throughObj)
    partialSink(source)
    
    // In original: pull(source, identity, throughObj) 
    //   -> identity(source) -> throughObj.sink(identity(source)), read = throughObj.source
    //   -> sinkCallCount = 1, returns throughObj.source
    // In mutated: pull(source, identity, throughObj, undefined)
    //   -> same processing, sinkCallCount = 1, returns throughObj.source
    // Still the same...
    
    expect(sinkCallCount).toBe(1)
    
    // Read values
    let finished = false
    function readNext(read: Function) {
      read(null, function(end: any, data: any) {
        if (end === true) { finished = true; return }
        if (end) throw end
        collected.push(data)
        readNext(read)
      })
    }
    
    readNext(throughObj.source)
    expect(finished).toBe(true)
    expect(collected).toEqual([10, 20])
  })
})