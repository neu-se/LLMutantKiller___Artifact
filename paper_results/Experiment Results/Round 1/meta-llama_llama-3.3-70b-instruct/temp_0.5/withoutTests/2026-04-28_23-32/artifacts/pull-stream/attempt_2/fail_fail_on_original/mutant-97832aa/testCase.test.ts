import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull function', () => {
  it('should handle null value correctly', () => {
    const read = () => {}
    const sink = () => {}
    const source = () => {}
    const nullValue = null
    expect(() => pull(read, nullValue)).not.toThrowError()
    expect(() => pull(read, { source: source, sink: sink })).not.toThrowError()
    expect(() => pull(read, null)).not.toThrowError()
    expect(pull(read, null)).toBe(read)
  })
})