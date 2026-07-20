import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull function', () => {
  it('should handle false value correctly', () => {
    const read = () => {}
    const falseValue = false
    expect(() => pull(read, false)).toThrowError()
    expect(() => pull(read, null)).toThrowError()
    expect(() => pull(read, undefined)).toThrowError()
    expect(() => pull(read, {})).not.toThrowError()
    expect(() => pull(read, { source: () => {}, sink: () => {} })).not.toThrowError()
  })
})