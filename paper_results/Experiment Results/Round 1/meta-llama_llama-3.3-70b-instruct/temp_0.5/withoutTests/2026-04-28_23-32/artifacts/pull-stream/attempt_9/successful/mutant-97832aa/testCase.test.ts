import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull function', () => {
  it('should handle false value correctly', () => {
    const read = () => {}
    expect(() => pull(read, false)).not.toThrowError()
    expect(() => pull(read, null)).not.toThrowError()
    expect(() => pull(read, undefined)).not.toThrowError()
    expect(() => pull(read, 0)).not.toThrowError()
    expect(() => pull(read, '')).not.toThrowError()
  })
})