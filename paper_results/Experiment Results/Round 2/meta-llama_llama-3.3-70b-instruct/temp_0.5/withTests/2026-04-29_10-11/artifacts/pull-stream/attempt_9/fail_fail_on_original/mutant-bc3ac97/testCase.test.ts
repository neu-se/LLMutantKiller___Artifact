import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull', () => {
  it('should handle the case when length is 3', () => {
    const read = pull(
      (read: any) => {
        let values = [1, 2, 3]
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
      }
    )

    let result: any[] = []
    read(null, (end: any, data: any) => {
      if (end) {
        expect(result).toEqual([3, 5, 7])
      } else {
        result.push(data)
      }
    })

    read(null, (end: any, data: any) => {
      if (end) {
        expect(result).toEqual([3, 5, 7])
      } else {
        result.push(data)
      }
    })

    read(null, (end: any, data: any) => {
      if (end) {
        expect(result).toEqual([3, 5, 7])
      } else {
        result.push(data)
      }
    })
  })
})