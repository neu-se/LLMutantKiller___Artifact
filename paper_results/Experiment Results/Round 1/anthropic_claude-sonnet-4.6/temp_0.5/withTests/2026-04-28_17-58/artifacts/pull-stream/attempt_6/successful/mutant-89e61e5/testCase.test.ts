import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull partial sink double invocation', () => {
  it('should throw TypeError when partial sink is invoked a second time', () => {
    const throughFn = function(read: Function) {
      return function(abort: any, cb: Function) {
        read(abort, cb)
      }
    }

    const partial = pull(throughFn)

    const source = function(abort: any, cb: Function) {
      cb(true)
    }

    // First invocation succeeds
    partial(source)

    // Second invocation should throw - capture what happens
    let threw = false
    let thrownError: any = null
    try {
      partial(source)
    } catch(e) {
      threw = true
      thrownError = e
    }

    expect(threw).toBe(true)
    expect(thrownError).toBeInstanceOf(TypeError)
    expect(thrownError.message).toBe('partial sink should only be called once!')
  })
})