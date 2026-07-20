import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should correctly handle partial sink with 2 args applied to a source", () => {
    // Create a through-stream that tracks how many times it was called
    // and with what arguments
    const throughCalls: number[] = []
    
    function makeSource(vals: number[]) {
      let i = 0
      return function(end: any, cb: Function) {
        if (end) return cb(end)
        if (i >= vals.length) return cb(true)
        cb(null, vals[i++])
      }
    }
    
    function trackingThrough(id: number) {
      return function(read: Function) {
        throughCalls.push(id)
        return function(end: any, cb: Function) {
          read(end, function(end: any, data: any) {
            if (end) return cb(end)
            cb(null, data)
          })
        }
      }
    }
    
    const t1 = trackingThrough(1)
    const t2 = trackingThrough(2)
    
    // Create partial sink with exactly 2 through-streams
    const partialSink = pull(t1, t2)
    
    // Apply to source
    const result = partialSink(makeSource([1, 2, 3]))
    
    // Both t1 and t2 should have been called exactly once
    expect(throughCalls).toEqual([1, 2])
    
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
    expect(collected).toEqual([1, 2, 3])
  })
})