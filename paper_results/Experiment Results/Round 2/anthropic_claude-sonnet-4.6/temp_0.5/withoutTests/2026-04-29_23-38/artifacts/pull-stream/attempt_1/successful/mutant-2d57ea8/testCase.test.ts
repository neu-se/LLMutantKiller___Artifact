import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial sink called twice throws with correct message", () => {
  it("should throw TypeError with message 'partial sink should only be called once!' when partial sink is called twice", () => {
    const through = (read: any) => (end: any, cb: any) => read(end, cb)
    
    const partialPull = pull(through)
    
    const source = (end: any, cb: any) => {
      if (end) return cb(end)
      cb(null, 1)
    }
    
    // First call should succeed
    partialPull(source)
    
    // Second call should throw
    let thrownError: Error | null = null
    try {
      partialPull(source)
    } catch (e) {
      thrownError = e as Error
    }
    
    expect(thrownError).not.toBeNull()
    expect(thrownError).toBeInstanceOf(TypeError)
    expect(thrownError!.message).toBe("partial sink should only be called once!")
  })
})