import { pull } from '../../pull.js'

describe('pull', () => {
  it('should not throw an error when called with a partial sink', () => {
    const sink = function (read: any) {
      return function (end: any, cb: any) {
        read(end, cb)
      }
    }

    expect(() => {
      pull(sink)
    }).not.toThrow()
  })
})