import pull from '../pull.js'

describe('pull', () => {
  it('should handle case 3 correctly', () => {
    const read = () => {}
    const ref = [1, 2, 3]
    const result = pull(read, ref[0], ref[1], ref[2])
    expect(result).toBeInstanceOf(Function)
    expect(() => {
      result(() => {})
    }).not.toThrow()
  })
})