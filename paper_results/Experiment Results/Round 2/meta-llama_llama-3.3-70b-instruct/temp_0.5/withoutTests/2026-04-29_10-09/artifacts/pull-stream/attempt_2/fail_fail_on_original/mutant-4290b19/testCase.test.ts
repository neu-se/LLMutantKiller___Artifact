import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull function', () => {
  it('should handle arguments correctly', () => {
    const identity = (x) => x
    const result = pull(identity, identity, identity)
    expect(result).toBe(identity)
  })
})