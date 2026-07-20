import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial sink", () => {
  it("should throw TypeError with the correct message when partial sink is called a second time", () => {
    const through = (read: any) => (end: any, cb: any) => read(end, cb)
    const partialSink = pull(through)

    const source = (_end: any, cb: any) => cb(null, 1)

    // First call consumes the args (sets args to null internally)
    partialSink(source)

    // Second call: original throws TypeError, mutated silently proceeds
    let thrownError: unknown = null
    try {
      partialSink(source)
    } catch (e) {
      thrownError = e
    }

    expect(thrownError).toBeInstanceOf(TypeError)
    expect((thrownError as TypeError).message).toBe("partial sink should only be called once!")
  })
})