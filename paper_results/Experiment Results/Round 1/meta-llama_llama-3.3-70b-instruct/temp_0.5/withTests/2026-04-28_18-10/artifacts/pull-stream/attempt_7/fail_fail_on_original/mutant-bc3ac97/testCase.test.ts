import { pull } from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull', () => {
  it('should handle case 3 correctly', () => {
    const read = () => {}
    const ref = [1, 2, 3]
    const result = pull(read, ref[0], ref[1], ref[2])
    expect(result).toBeInstanceOf(Function)
    expect(() => {
      result(() => {})
    }).not.toThrow()
    const result2 = pull(read, ref[0], ref[1], ref[2])
    expect(result2).toBeInstanceOf(Function)
    expect(() => {
      result2(() => {})
    }).not.toThrow()
    expect(() => {
      pull(read, 1, 2)
    }).toThrowError()
  })
})