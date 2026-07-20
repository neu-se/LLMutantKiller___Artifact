import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial application", () => {
  it("should not throw when calling the partial sink exactly once", () => {
    // Create a simple through stream (identity transform)
    const through = (read: Function) => (end: any, cb: Function) => read(end, cb)
    
    // Create a partial pull with one through stream
    const partial = pull(through)
    
    // The partial should be a function
    expect(typeof partial).toBe("function")
    
    // Now use the partial with a source - this should work without errors
    // In the mutated code, args[length] = arguments[length] would set an extra
    // undefined value, causing issues
    
    let values: number[] = []
    let ended = false
    
    // Create a simple source that emits 1, 2, 3 then ends
    const source = (end: any, cb: Function) => {
      if (end) return cb(end)
      if (values.length >= 3) return cb(true)
      cb(null, values.length + 1)
    }
    
    // Apply partial to source - this exercises the args array
    const result = partial(source)
    
    // The result should be a readable stream (function)
    expect(typeof result).toBe("function")
    
    // Drain the stream to verify it works correctly
    const collected: number[] = []
    const drain = (read: Function) => {
      const next = () => {
        read(null, (end: any, data: any) => {
          if (end === true) {
            ended = true
            return
          }
          if (end) throw end
          collected.push(data)
          next()
        })
      }
      next()
    }
    
    drain(result)
    
    // Should have collected values 1, 2, 3
    expect(collected).toEqual([1, 2, 3])
    expect(ended).toBe(true)
  })
})