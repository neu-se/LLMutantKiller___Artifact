import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull function', () => {
  it('should handle function arguments correctly', () => {
    const read = () => {}
    const s = 'not a function'
    const result = pull(read, s)
    expect(result).toBe(read)
  })
})