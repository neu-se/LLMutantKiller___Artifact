import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull function', () => {
  it('should throw an error when called with three functions and an object', () => {
    const read = function() {}
    const sink1 = function(read) {
      return read
    }
    const sink2 = function(read) {
      return read
    }
    const obj = {}
    expect(() => pull(read, sink1, sink2, obj)).toThrow()
  })
})