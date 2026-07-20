import * as pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull-stream', () => {
  it('should throw an error when a partial sink is called twice', () => {
    const sink = pull(
      function (a: any) {
        return function (read: any) {
          if (a == null) {
            throw new TypeError("partial sink should only be called once!")
          }
          return function (end: any, cb: any) {
            read(end, cb)
          }
        }
      },
      (read: any) => {
        return function (end: any, cb: any) {
          read(end, cb)
        }
      }
    )

    expect(() => {
      sink((end: any, cb: any) => {
        cb(null, 1)
      })
      sink((end: any, cb: any) => {
        cb(null, 1)
      })
    }).toThrowError(TypeError)
  })
})