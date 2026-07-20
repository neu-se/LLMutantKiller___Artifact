import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial sink double-call protection", () => {
  it("should throw TypeError when partial sink is called more than once", () => {
    // Create a simple through function (length === 1)
    const through = (read: Function) => (end: any, cb: Function) => read(end, cb)
    
    // Create a partial sink by calling pull with only through functions (no source)
    const partialSink = pull(through, through)
    
    // First call with a source should work fine
    const source = (end: any, cb: Function) => cb(null, 1)
    partialSink(source)
    
    // Second call should throw TypeError in original code
    // but won't throw in mutated code (because `if (false)` never executes)
    expect(() => {
      partialSink(source)
    }).toThrow(TypeError)
  })
})