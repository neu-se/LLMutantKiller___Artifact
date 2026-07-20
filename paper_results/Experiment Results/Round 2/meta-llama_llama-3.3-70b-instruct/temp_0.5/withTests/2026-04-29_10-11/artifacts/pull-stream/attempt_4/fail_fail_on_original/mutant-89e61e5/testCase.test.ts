import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull-stream', () => {
  it('should throw an error when partial sink is called twice', () => {
    const partialSink = pull((read: any) => {
      let called = false
      return function (end: any, cb: any) {
        if (called) {
          expect(true).toBe(false)
        }
        called = true
        if (end) return cb(end)
        read(null, (end: any, data: any) => {
          if (end) return cb(end)
          cb(null, data)
        })
      }
    })

    partialSink((end: any, cb: any) => {
      cb(null, 1)
    })

    partialSink((end: any, cb: any) => {
      cb(null, 1)
    })
  })
});