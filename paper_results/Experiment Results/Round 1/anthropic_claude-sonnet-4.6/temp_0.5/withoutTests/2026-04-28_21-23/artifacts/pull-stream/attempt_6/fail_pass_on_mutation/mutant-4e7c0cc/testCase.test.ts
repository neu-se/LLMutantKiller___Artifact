import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should correctly pipe 3 through functions in partial application without passing extra undefined", () => {
    // This test verifies that when a partial is created with 3 through functions
    // and applied to a source, the pipeline works correctly.
    // The mutation changes case 3 behavior in the switch statement.
    
    const callLog: string[] = []
    
    // Create through functions that log when they're called as through (receiving read)
    // vs when they might be called as sink (receiving undefined)
    const makeThrough = (name: string) => (read: Function) => {
      callLog.push(`through:${name}:read=${typeof read}`)
      if (typeof read !== 'function') {
        throw new Error(`${name} received non-function: ${typeof read}`)
      }
      return (end: any, cb: Function) => {
        read(end, (err: any, data: any) => {
          if (err) return cb(err)
          cb(null, data)
        })
      }
    }
    
    let done = false
    const source = (end: any, cb: Function) => {
      if (end || done) return cb(true)
      done = true
      cb(null, 42)
    }
    
    // Partial with 3 through functions
    const partial = pull(makeThrough('a'), makeThrough('b'), makeThrough('c'))
    const piped = partial(source)
    
    const results: number[] = []
    piped(null, (end: any, data: any) => {
      if (!end) results.push(data)
    })
    
    // Each through should be called exactly once with a function
    expect(callLog).toEqual(['through:a:read=function', 'through:b:read=function', 'through:c:read=function'])
    expect(results).toEqual([42])
  })
})