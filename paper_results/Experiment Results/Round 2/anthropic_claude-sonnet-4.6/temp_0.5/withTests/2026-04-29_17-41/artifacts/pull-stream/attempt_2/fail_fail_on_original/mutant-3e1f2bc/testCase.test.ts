import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull', () => {
  it('should skip null pipeline stages without throwing', () => {
    expect(() => {
      pull(pull.values([1, 2, 3]), null)
    }).not.toThrow()
  })
})