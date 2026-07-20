import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull function', () => {
  it('should throw an error when called with an excessive number of arguments', () => {
    const read = function() {}
    const sink1 = function(read) {
      return read
    }
    const sink2 = function(read) {
      return read
    }
    const args = [read, sink1, sink2]
    const newArgs = [...args]
    newArgs.push(sink2)
    newArgs.push(sink2)
    newArgs.push(sink2)
    newArgs.push(sink2)
    expect(() => pull(...newArgs)).toThrow()
  })
})