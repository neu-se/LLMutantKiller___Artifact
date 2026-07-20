import { pull } from '../../../pull.js'

describe('pull', () => {
  it('should throw an error when called with a partial sink that is called more than once', () => {
    const sink = pull(
      (read: any) => {
        return function (end: any, cb: any) {
          if (end) {
            cb(end)
          } else {
            cb(null, 1)
          }
        }
      },
      (read: any) => {
        if (read == null) {
          throw new TypeError("partial sink should only be called once!")
        }
        return function (end: any, cb: any) {
          read(end, cb)
        }
      }
    )

    expect(() => {
      sink((end: any, cb: any) => {
        cb(end)
      })
      sink((end: any, cb: any) => {
        cb(end)
      })
    }).toThrow(TypeError)
  })
})