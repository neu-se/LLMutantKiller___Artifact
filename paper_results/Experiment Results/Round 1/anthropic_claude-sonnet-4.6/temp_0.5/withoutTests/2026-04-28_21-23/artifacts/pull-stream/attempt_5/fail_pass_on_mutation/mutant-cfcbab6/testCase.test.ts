import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should return undefined when last argument is a sink function", () => {
    const source = (end: any, cb: Function) => cb(null, 1)
    const sink = (read: Function) => {
      // sink consumes the stream, returns nothing
      read(null, () => {})
    }
    
    const result = pull(source, sink)
    // Original: sink(source) called, sink returns undefined, pull returns undefined
    // Mutated: s=undefined, nothing processed, pull returns source function
    expect(result).toBeUndefined()
  })
})