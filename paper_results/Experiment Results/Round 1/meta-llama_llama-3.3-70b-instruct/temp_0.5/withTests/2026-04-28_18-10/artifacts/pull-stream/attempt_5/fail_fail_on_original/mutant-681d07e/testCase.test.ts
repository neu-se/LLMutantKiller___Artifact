import { pull } from '../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull', () => {
  it('should throw an error when called with a partial sink that is called more than once', () => {
    const sink = function (read: any) {
      let called = false
      return function (end: any, cb: any) {
        if (called) {
          throw new TypeError("partial sink should only be called once!")
        }
        called = true
        read(end, cb)
      }
    }

    const partialSink = function (read: any) {
      return function (end: any, cb: any) {
        read(end, cb)
      }
    }

    expect(() => {
      pull(sink, partialSink)
    }).not.toThrow()

    expect(() => {
      pull(partialSink, sink)
    }).toThrow(TypeError)
  })
})