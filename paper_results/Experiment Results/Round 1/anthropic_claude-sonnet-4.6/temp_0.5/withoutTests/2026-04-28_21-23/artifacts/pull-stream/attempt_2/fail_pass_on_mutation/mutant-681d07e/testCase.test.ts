import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial sink", () => {
  it("should throw TypeError when partial sink is invoked a second time", () => {
    // A through function with exactly 1 parameter triggers partial sink creation
    function through(read: any) {
      return function(end: any, cb: any) {
        read(end, cb)
      }
    }

    // This creates a partial sink (function of length 1)
    const partialSink = pull(through)

    const source = function(end: any, cb: any) {
      cb(end || true, null)
    }

    // First invocation should succeed
    partialSink(source)

    // Second invocation must throw TypeError in original; with mutation (if false), it won't throw
    expect(() => partialSink(source)).toThrow(TypeError)
  })
})