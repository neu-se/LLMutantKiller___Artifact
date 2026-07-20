import { pull } from '../../../pull.js'

describe('pull function', () => {
  it('should throw an error when called twice', () => {
    const stream = pull(
      (read: any) => read,
      (read: any) => read
    )
    stream((abort: any, cb: any) => cb(null, 1))
    expect(() => stream((abort: any, cb: any) => cb(null, 1))).toThrow(TypeError)
  })
})