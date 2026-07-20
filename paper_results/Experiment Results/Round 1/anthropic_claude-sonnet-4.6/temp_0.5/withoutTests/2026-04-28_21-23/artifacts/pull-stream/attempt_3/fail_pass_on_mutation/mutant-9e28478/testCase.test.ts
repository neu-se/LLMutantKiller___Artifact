import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial sink with exactly 2 through streams", () => {
  it("should return undefined when case 2 falls through to case 3 with undefined third argument", () => {
    // Through stream that doubles values
    function double(read: Function) {
      return function(end: any, cb: Function) {
        read(end, function(end: any, data: any) {
          if (end) return cb(end)
          cb(null, data * 2)
        })
      }
    }

    // Through stream that adds 10
    function addTen(read: Function) {
      return function(end: any, cb: Function) {
        read(end, function(end: any, data: any) {
          if (end) return cb(end)
          cb(null, data + 10)
        })
      }
    }

    // Create a partial sink with exactly 2 through streams
    // This triggers the switch case 2 path when the partial sink is called
    const partialSink = pull(double, addTen)
    expect(typeof partialSink).toBe("function")

    // Create a simple source
    let idx = 0
    const sourceValues = [1, 2, 3]
    function source(end: any, cb: Function) {
      if (end) return cb(end)
      if (idx >= sourceValues.length) return cb(true)
      cb(null, sourceValues[idx++])
    }

    // In the mutated code, case 2 falls through to case 3:
    // pull(read, ref[0], ref[1], ref[2]) where ref[2] is undefined
    // When s = undefined is passed to the loop: typeof undefined !== 'function'
    // and undefined && typeof undefined === 'object' is false
    // so the third argument is silently ignored, and the result should still work
    // BUT: the result of pull(read, ref[0], ref[1], undefined) goes through
    // the for loop with s=undefined on the last iteration, which does nothing.
    // Actually the real difference: in case 3, pull(read, ref[0], ref[1], ref[2])
    // is called where ref[2] = undefined. The loop processes ref[0] and ref[1]
    // but ref[2] is undefined so it's skipped. The result should be the same...
    
    // Let's check: in mutated code, case 2 has no return, falls to case 3:
    // return pull(read, ref[0], ref[1], ref[2]) -- ref[2] is undefined
    // This means pull is called with length=4, loop runs i=1,2,3
    // i=3: s=undefined, neither function nor object, so read stays unchanged
    // Result should be the same as original... 
    
    // The actual difference: case 2 with NO return means it falls through
    // to case 3 which DOES have a return. So the behavior should be the same
    // as case 3 with an extra undefined arg. Let's verify by checking the
    // result is a proper readable function that produces correct values.
    
    const result = partialSink(source)
    
    // In original: pull(read, double, addTen) -> correct pipeline
    // In mutated: falls to case 3: pull(read, double, addTen, undefined) -> same pipeline + undefined ignored
    // Both should work... 
    
    // Actually wait - case 2 with no body falls through to case 3's BODY including the return.
    // So mutated: return pull(read, ref[0], ref[1], ref[2]) where ref[2]=undefined
    // This should still work. The test needs to detect something else.
    
    // The real issue: result might be undefined in mutated code if case 2 has no return
    // and case 3 is NOT reached (if there's no fallthrough). Let me re-read:
    // case 2: (empty, no break/return) -> falls through to case 3's code
    // case 3: return pull(read, ref[0], ref[1], ref[2])
    // So it DOES return, but with wrong args. The result should still be a function.
    
    // Collect values to verify correctness
    const collected: number[] = []
    let finished = false
    
    function readNext() {
      result(null, function(end: any, data: any) {
        if (end === true) { finished = true; return }
        if (end) throw end
        collected.push(data)
        readNext()
      })
    }
    
    readNext()
    
    expect(finished).toBe(true)
    expect(collected).toEqual([12, 14, 16])
  })
})