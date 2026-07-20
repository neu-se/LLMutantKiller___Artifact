import { pull } from '../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull', () => {
  it('should throw an error when called twice', () => {
    const stream = pull(
      (read: any) => {
        return function (end: any, cb: any) {
          read(end, cb)
        }
      },
      (read: any) => {
        return function (end: any, cb: any) {
          read(end, cb)
        }
      }
    )

    stream((end: any, cb: any) => {
      cb(end)
    })

    expect(() => {
      stream((end: any, cb: any) => {
        cb(end)
      })
    }).toThrow(TypeError)
  })
})