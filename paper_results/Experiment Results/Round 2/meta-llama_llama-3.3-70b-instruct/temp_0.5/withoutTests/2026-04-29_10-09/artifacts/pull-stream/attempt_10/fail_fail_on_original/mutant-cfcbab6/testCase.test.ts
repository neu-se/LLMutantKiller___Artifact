import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull function', () => {
  it('should handle the case where the number of arguments is equal to the length', () => {
    const read = function() {}
    const sink1 = function(read) {
      return read
    }
    const sink2 = function(read) {
      return read
    }
    const args = [read, sink1, sink2]
    const length = args.length
    expect(() => pull(...args)).not.toThrow()
    const result = pull(...args)
    expect(result).toBe(read)
    const newArgs = [read, sink1]
    expect(() => pull(...newArgs)).not.toThrow()
    const newResult = pull(...newArgs)
    expect(newResult).toBe(read)
    const mutatedArgs = [read, sink1, sink2, () => {}]
    expect(() => pull(...mutatedArgs)).toThrow()
  })
})