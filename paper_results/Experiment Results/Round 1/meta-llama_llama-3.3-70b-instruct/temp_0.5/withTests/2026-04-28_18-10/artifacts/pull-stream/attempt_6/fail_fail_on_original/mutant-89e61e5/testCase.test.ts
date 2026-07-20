import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull-stream', () => {
  it('should throw an error when a partial sink is called twice', () => {
    const f = pull(function (a: any) {
      return function (read: any) {
        return function (end: any, cb: any) {
          read(end, cb)
        }
      }
    })

    let called = false
    f((end: any, cb: any) => {
      called = true
      cb(null, 1)
    })

    expect(called).toBe(true)

    f((end: any, cb: any) => {
      cb(null, 1)
    })

    // If the mutation is present, this should not throw an error
    // But if the original code is present, this should throw an error
    expect(() => {
      f((end: any, cb: any) => {
        cb(null, 1)
      })
    }).toThrowError(TypeError)
  })
})