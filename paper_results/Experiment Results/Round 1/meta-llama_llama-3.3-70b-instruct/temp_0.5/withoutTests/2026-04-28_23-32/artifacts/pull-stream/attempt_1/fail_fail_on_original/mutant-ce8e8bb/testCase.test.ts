import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull function', () => {
  it('should handle non-function arguments correctly', () => {
    const read = () => {}
    const s = {}
    const result = pull(read, s)
    expect(result).toBe(read)
  })
})