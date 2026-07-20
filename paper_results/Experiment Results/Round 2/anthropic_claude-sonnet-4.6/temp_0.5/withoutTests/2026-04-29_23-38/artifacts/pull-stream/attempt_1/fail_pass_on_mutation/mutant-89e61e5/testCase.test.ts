import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial sink called twice", () => {
  it("should throw TypeError when partial sink is called more than once", () => {
    const through = (read: any) => (end: any, cb: any) => read(end, cb)
    
    const partialPipeline = pull(through)
    
    // First call should work fine
    const source = (_end: any, cb: any) => cb(null, 1)
    partialPipeline(source)
    
    // Second call should throw TypeError in original code
    expect(() => {
      partialPipeline(source)
    }).toThrow(TypeError)
  })
})