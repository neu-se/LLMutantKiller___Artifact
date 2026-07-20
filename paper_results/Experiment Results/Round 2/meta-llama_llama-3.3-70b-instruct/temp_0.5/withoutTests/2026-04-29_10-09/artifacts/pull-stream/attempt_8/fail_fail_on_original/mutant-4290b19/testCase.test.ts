import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull function', () => {
  it('should handle arguments correctly', () => {
    const identity = (read: any) => read
    const result = pull(identity, identity, identity, identity, identity, identity)
    expect(() => result(identity)).toThrow()
  })
})