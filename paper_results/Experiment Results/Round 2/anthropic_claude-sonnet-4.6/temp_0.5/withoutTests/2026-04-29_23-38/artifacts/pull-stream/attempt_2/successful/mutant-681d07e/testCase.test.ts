import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial sink", () => {
  it("should throw TypeError with specific message when partial sink is called more than once", () => {
    // Create a through function (length === 1, so pull returns a partial sink)
    const through = (read: Function) => (end: any, cb: Function) => read(end, cb)
    
    // Create a partial sink by calling pull with only a through function (no source)
    const partialSink = pull(through)
    
    // First call with a source should work fine
    const source = (end: any, cb: Function) => cb(null, 1)
    partialSink(source)
    
    // Second call should throw TypeError with specific message in original code
    // In mutated code, the check is `if (false)` so it never throws this specific error
    expect(() => {
      partialSink(source)
    }).toThrow("partial sink should only be called once!")
  })
})