import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull', () => {
  it('partial sink should correctly apply through streams', (done) => {
    const add1 = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data + 1)
      })
    }

    const pipeline = pull(add1, add1, add1)

    let called = false
    const source = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      if (called) return cb(true)
      called = true
      cb(null, 0)
    }

    const piped = pipeline(source)
    piped(null, (end: any, data: any) => {
      if (end) return done(end instanceof Error ? end : new Error('unexpected end'))
      expect(data).toBe(3)
      done()
    })
  })
})