import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull', () => {
  it('should handle case 3 correctly', () => {
    const read = () => {}
    const ref = [1, 2, 3]
    const result = pull(read, ref[0], ref[1], ref[2])
    expect(result).toBeInstanceOf(Function)
    const callback = jest.fn()
    result(null, callback)
    const callback2 = jest.fn()
    result(null, callback2)
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback2).toHaveBeenCalledTimes(1)
  })
})