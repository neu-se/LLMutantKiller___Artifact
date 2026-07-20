import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull function', () => {
  it('should handle object type correctly', () => {
    const read = () => ({})
    const s = { sink: () => {}, source: () => {} }
    const result = pull(read, s)
    expect(result).toBe(s.source)
  })
})