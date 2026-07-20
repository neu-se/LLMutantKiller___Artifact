import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull function', () => {
  it('should handle false value correctly', () => {
    const read = () => {}
    const falseValue = false
    const result1 = pull(read, { source: () => {}, sink: () => {} })
    const result2 = pull(read, { source: () => {}, sink: false })
    expect(result1).not.toEqual(result2)
  })
})