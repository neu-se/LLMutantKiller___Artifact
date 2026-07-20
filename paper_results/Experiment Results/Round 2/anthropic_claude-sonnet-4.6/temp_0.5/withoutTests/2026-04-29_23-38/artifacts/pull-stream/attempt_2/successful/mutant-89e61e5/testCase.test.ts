import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial sink called twice", () => {
  it("should throw TypeError when partial sink is called more than once", () => {
    const through = (read: any) => (end: any, cb: any) => read(end, cb)
    
    const partialPipeline = pull(through)
    
    const source = (_end: any, cb: any) => cb(null, 1)
    
    // First call should work fine
    partialPipeline(source)
    
    // Second call should throw TypeError in original code, but silently succeed in mutated code
    let threw = false
    let errorMessage = ""
    try {
      partialPipeline(source)
    } catch (e: any) {
      threw = true
      errorMessage = e.message
    }
    
    expect(threw).toBe(true)
    expect(errorMessage).toBe("partial sink should only be called once!")
  })
})