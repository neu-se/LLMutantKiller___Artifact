import { pull } from '../../../pull.js'

describe('pull', () => {
  it('should call the case 2 function when length is 2', () => {
    const read = jest.fn()
    const ref = [1, 2]
    pull(read, ref[0], ref[1])
    expect(read).toHaveBeenCalledTimes(1)
  })
})