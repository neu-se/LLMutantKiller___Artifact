import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull function', () => {
  it('should handle object type correctly', () => {
    const read = () => ({})
    const s = { sink: jest.fn(), source: () => {} }
    const result = pull(read, s)
    result()
    expect(s.sink).toHaveBeenCalledTimes(1)
  })
})