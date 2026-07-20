import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull function', () => {
  it('should throw an error when called with an index out of bounds', () => {
    const read = function() {}
    const sink1 = function(read) {
      return read
    }
    const sink2 = function(read) {
      return read
    }
    const args = [read, sink1, sink2]
    const length = args.length
    expect(() => {
      const newArgs = [...args]
      newArgs.push(null)
      pull(...newArgs)
    }).toThrow()
  })
})