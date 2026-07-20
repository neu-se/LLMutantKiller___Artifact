import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull function', () => {
  it('should not throw an error when called with two functions', () => {
    const read = function() {}
    const sink1 = function(read) {
      return read
    }
    const sink2 = function(read) {
      return read
    }
    expect(() => pull(read, sink1, sink2)).not.toThrow()
  })
})