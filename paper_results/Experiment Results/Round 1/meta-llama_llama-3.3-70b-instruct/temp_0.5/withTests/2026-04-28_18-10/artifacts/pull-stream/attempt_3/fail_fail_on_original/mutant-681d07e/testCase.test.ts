import { pull } from '../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull', () => {
  it('should throw an error when called with a partial sink that is called more than once', () => {
    const partialSink = function (read: any) {
      let called = false
      return function (end: any, cb: any) {
        if (called) {
          throw new TypeError("partial sink should only be called once!")
        }
        called = true
        read(end, cb)
      }
    }

    expect(() => {
      pull(partialSink, partialSink)
    }).toThrow(TypeError)
  })
})