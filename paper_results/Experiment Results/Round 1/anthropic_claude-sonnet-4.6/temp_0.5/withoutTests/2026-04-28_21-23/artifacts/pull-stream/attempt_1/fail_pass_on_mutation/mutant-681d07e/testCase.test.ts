import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial sink double-call protection", () => {
  it("should throw TypeError when a partial sink is called more than once", () => {
    // Create a simple through function with length 1 (takes one argument)
    const through = (read: Function) => {
      return (end: any, cb: Function) => {
        read(end, cb)
      }
    }

    // Calling pull with a single function of length 1 creates a partial sink
    const partialSink = pull(through)

    // The partial sink should be a function
    expect(typeof partialSink).toBe("function")

    // Create a simple source
    const source = (end: any, cb: Function) => {
      cb(true, null)
    }

    // First call should work fine
    partialSink(source)

    // Second call should throw TypeError in original code
    // but NOT throw in mutated code (because if (false) never executes)
    expect(() => {
      partialSink(source)
    }).toThrow(TypeError)
  })
})