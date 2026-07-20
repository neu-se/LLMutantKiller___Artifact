import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull partial sink double invocation', () => {
  it('should throw TypeError when partial sink is invoked a second time', () => {
    // Explicitly create a function with length === 1 to trigger the partial branch
    const throughFn = function(read: Function) {
      return function(abort: any, cb: Function) {
        read(abort, cb)
      }
    }

    // Verify length is 1
    expect(throughFn.length).toBe(1)

    // pull(throughFn) enters the partial branch because throughFn.length === 1
    const partial = pull(throughFn)

    // partial is now a function that, when called with a read source,
    // will set args=null and return pull(read, throughFn)
    const source = function(abort: any, cb: Function) {
      cb(true)
    }

    // First invocation: args gets set to null after the check
    partial(source)

    // Second invocation: args is null, should throw TypeError
    expect(() => {
      partial(source)
    }).toThrow(TypeError)
  })
})