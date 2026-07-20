import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull-stream', () => {
  it('should handle two arguments correctly', () => {
    const values = [1, 2]
    const expected = [1, 2]

    pull(
      function (end: any, cb: any) {
        if (end) return cb(end)
        if (values.length > 0) {
          cb(null, values.shift())
        } else {
          cb(true)
        }
      },
      function (read: any) {
        return function (end: any, cb: any) {
          if (end) return cb(end)
          read(null, function (end: any, data: any) {
            if (end) return cb(end)
            cb(null, data)
          })
        }
      },
      function (read: any) {
        return function (end: any, cb: any) {
          if (end) return cb(end)
          let result: number[] = []
          function next(end: any, data: any) {
            if (end) {
              expect(result).toEqual(expected)
              return cb(end)
            }
            result.push(data)
            if (result.length < expected.length) {
              read(null, next)
            } else {
              cb(true)
            }
          }
          read(null, next)
        }
      }
    )(null, () => {})
  })
})