import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull function', () => {
  it('should handle false value correctly', () => {
    const read = () => {}
    const falseValue = false
    expect(() => pull(read, { source: () => {}, sink: false })).toThrowError()
    expect(() => pull(read, { source: () => {}, sink: null })).toThrowError()
    expect(() => pull(read, { source: () => {}, sink: undefined })).toThrowError()
    expect(() => pull(read, { source: () => {}, sink: () => {} })).not.toThrowError()
  })
})