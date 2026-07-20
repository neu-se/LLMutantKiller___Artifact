import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull partial sink double invocation', () => {
  it('should throw TypeError when partial sink is called a second time', () => {
    // Create a simple through stream (function with length === 1)
    const identity = function (read: Function) {
      return function (abort: any, cb: Function) {
        read(abort, cb)
      }
    }

    // pull(through) returns a partial sink because first arg is a function with .length === 1
    const partialSink = pull(identity)

    // First invocation: provide a source read function
    const source1 = function (abort: any, cb: Function) {
      cb(true) // immediately end
    }

    // First call should work fine
    partialSink(source1)

    // Second call should throw TypeError in original code
    // In mutated code, the throw is removed so it silently proceeds instead
    const source2 = function (abort: any, cb: Function) {
      cb(true)
    }

    expect(() => {
      partialSink(source2)
    }).toThrow(TypeError)
  })
})