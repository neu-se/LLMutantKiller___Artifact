import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull function', () => {
  it('should not throw an error when called with two arguments', () => {
    const read = function() {}
    const sink = function(read) {
      return read
    }
    expect(() => pull(read, sink)).not.toThrow()
    expect(pull(read, sink)).toBe(read)
  })
})