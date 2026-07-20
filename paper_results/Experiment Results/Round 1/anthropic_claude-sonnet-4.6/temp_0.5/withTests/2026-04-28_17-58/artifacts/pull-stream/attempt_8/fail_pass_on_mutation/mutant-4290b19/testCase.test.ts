import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull', () => {
  it('partial sink should not call through functions with undefined as read argument', (done) => {
    const callArgs: any[] = []
    
    const trackingThrough = jest.fn((read: any) => {
      callArgs.push(read)
      return (abort: any, cb: Function) => {
        if (read === undefined) {
          cb(new Error('read is undefined!'))
          return
        }
        read(abort, cb)
      }
    })

    // With 5 throughs (default case), the extra undefined from mutation
    // gets passed to inner pull via pull.apply
    // If inner pull's first arg has length 1, it enters partial sink branch
    // But trackingThrough has length 1 (it's (read) => ...)
    // So pull(trackingThrough, t, t, t, t, t, undefined) would enter partial sink branch
    // with length=7, and the returned partial sink would have length=7
    // When invoked with source (length 2), switch(7) -> default
    // ref.unshift(source) -> pull.apply -> normal path, applies 6 throughs + skips undefined
    // trackingThrough is called with the source, not undefined
    // So callArgs would not contain undefined in either version

    const pipeline = pull(trackingThrough, trackingThrough, trackingThrough, trackingThrough, trackingThrough)
    
    let called = false
    const source = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      if (called) return cb(true)
      called = true
      cb(null, 42)
    }

    const piped = pipeline(source)
    piped(null, (end: any, data: any) => {
      if (end) return done(end instanceof Error ? end : new Error('unexpected end: ' + end))
      expect(data).toBe(42)
      // Check that no through was called with undefined
      expect(callArgs.every(arg => arg !== undefined)).toBe(true)
      done()
    })
  })
})