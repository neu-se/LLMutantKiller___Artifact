import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull', () => {
  it('should handle the case when length is 3', () => {
    const values = [1, 2, 3]
    let result: any[] = []

    pull(
      (read: any) => {
        return function (end: any, cb: any) {
          if (end) cb(end)
          else {
            cb(null, values.shift())
          }
        }
      },
      (read: any) => {
        return function (end: any, cb: any) {
          read(end, function (end: any, data: any) {
            if (end) cb(end)
            else cb(null, data * 2)
          })
        }
      },
      (read: any) => {
        return function (end: any, cb: any) {
          read(end, function (end: any, data: any) {
            if (end) cb(end)
            else cb(null, data + 1)
          })
        }
      },
      (read: any) => {
        return function (end: any, cb: any) {
          read(end, function (end: any, data: any) {
            if (end) cb(end)
            else {
              result.push(data)
              cb(null, data)
            }
          })
        }
      },
      (read: any) => {
        return function (end: any, cb: any) {
          read(end, function (end: any, data: any) {
            if (end) cb(end)
            else {
              result.push(data)
              cb(null, data)
            }
          })
        }
      }
    )

    expect(result).toEqual([3, 5, 7])
  })
})