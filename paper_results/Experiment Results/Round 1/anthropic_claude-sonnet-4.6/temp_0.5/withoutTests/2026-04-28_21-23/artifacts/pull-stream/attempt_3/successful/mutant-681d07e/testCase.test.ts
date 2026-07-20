import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial sink double-call protection", () => {
  it("should throw with 'partial sink should only be called once!' message on second invocation", () => {
    function through(read: any) {
      return (end: any, cb: any) => read(end, cb)
    }

    const partialSink = pull(through)

    const source = (end: any, cb: any) => { cb(end || true, null) }

    // First call succeeds
    partialSink(source)

    // Second call must throw with specific message in original
    // With mutation (if false), this check is skipped so it won't throw this specific error
    expect(() => partialSink(source)).toThrow("partial sink should only be called once!")
  })
})