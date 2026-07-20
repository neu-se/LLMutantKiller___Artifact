import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial sink called twice", () => {
  it("should throw TypeError when partial sink is called more than once", () => {
    const through = (read: any) => (end: any, cb: any) => read(end, cb)
    const partialSink = pull(through)

    const source = (_end: any, cb: any) => cb(null, 1)

    // First call should work fine
    partialSink(source)

    // Second call should throw TypeError in original, but silently continue in mutated code
    expect(() => {
      partialSink(source)
    }).toThrow(TypeError)
  })
})