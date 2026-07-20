import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull-stream', () => {
  it('should throw an error when a partial sink is called twice', () => {
    const f = pull(function (read: any) {
      let called = false
      return function (end: any, cb: any) {
        if (called) {
          throw new TypeError("partial sink should only be called once!")
        }
        called = true
        read(end, cb)
      }
    })

    f((end: any, cb: any) => {
      cb(null, 1)
    })

    expect(() => {
      f((end: any, cb: any) => {
        cb(null, 1)
      })
    }).toThrowError(TypeError)
  })
})