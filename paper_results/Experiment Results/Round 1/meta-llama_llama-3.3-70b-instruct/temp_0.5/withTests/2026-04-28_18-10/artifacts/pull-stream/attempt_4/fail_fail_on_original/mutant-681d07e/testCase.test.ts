import { pull } from '../../../pull.js'

describe('pull', () => {
  it('should not throw an error when called with a partial sink that is called more than once', () => {
    const partialSink = function (read: any) {
      return function (end: any, cb: any) {
        read(end, cb)
      }
    }

    expect(() => {
      pull(partialSink, partialSink)
    }).not.toThrow()
  })
})