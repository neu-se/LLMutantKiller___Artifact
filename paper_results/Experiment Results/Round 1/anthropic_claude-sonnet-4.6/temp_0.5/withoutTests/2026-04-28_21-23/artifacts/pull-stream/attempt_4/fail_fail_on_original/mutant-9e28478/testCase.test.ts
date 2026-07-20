import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial sink with exactly 2 through streams", () => {
  it("should not re-enter partial sink logic when applying 2-arg partial sink to a source with length 1", () => {
    // A source function with exactly 1 parameter triggers the partial sink branch
    // In the mutated code, case 2 falls through to case 3:
    // pull(read, ref[0], ref[1], ref[2]) where ref[2] = undefined
    // If read.length === 1, pull sees it as a partial sink and wraps it again!
    
    const collected: number[] = []
    
    // Source with exactly 1 parameter (length === 1) - this is key!
    function source(cb: Function) {
      // This source has length 1, which triggers the partial sink branch in pull
      // when called as pull(source, ...)
      let i = 0
      const values = [1, 2, 3]
      return function(end: any, readCb: Function) {
        if (end) return readCb(end)
        if (i >= values.length) return readCb(true)
        readCb(null, values[i++])
      }
    }
    
    function identity(read: Function) {
      return function(end: any, cb: Function) {
        read(end, cb)
      }
    }
    
    function collectSink(read: Function) {
      function drain() {
        read(null, function(end: any, data: any) {
          if (end) return
          collected.push(data)
          drain()
        })
      }
      drain()
    }
    
    // pull(source, identity, collectSink) directly should work
    // But via partial sink with 2 args applied to source with length===1:
    // partialSink = pull(identity, collectSink)  [length=2]
    // partialSink(source) triggers case 2
    // Original: pull(source, identity, collectSink) -> works correctly
    // Mutated: pull(source, identity, collectSink, undefined)
    //   -> source.length === 1, so pull treats source as a partial sink creator!
    //   -> returns a function (partial sink) instead of processing the pipeline!
    
    const partialSink = pull(identity, collectSink)
    partialSink(source)
    
    // In original: collected should have [1, 2, 3]
    // In mutated: pull(source, identity, collectSink, undefined) where source.length===1
    //   -> pull sees source as a function with length 1, creates a partial sink
    //   -> returns a function, nothing is collected
    expect(collected).toEqual([1, 2, 3])
  })
})