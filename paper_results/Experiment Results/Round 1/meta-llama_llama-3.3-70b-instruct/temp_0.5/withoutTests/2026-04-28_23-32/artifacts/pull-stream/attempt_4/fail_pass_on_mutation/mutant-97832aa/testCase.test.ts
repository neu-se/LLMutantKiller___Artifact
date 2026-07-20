import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull function', () => {
  it('should handle false value correctly', () => {
    const read = () => {}
    const falseValue = false
    expect(() => pull(read, { source: () => {}, sink: falseValue })).toThrowError()
  })
})