import { pull } from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull-stream', () => {
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
      cb(null, 1)
    })

    expect(() => {
      stream((end: any, cb: any) => {
        cb(null, 1)
      })
    }).toThrowError(TypeError)
  })
})