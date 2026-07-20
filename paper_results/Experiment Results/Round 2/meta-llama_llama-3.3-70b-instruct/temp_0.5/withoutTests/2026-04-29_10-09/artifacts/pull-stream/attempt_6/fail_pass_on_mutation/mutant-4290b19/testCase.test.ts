import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull function', () => {
  it('should handle arguments correctly', () => {
    const identity = (read: any) => read
    const partialSink = pull(identity)
    const result = partialSink(identity)
    expect(() => partialSink(identity)).toThrow("partial sink should only be called once!")
  })
})