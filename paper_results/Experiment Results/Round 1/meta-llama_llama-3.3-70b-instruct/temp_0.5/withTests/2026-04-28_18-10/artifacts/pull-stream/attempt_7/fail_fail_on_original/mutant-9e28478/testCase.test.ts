import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull-stream', () => {
  it('should handle two arguments correctly', () => {
    const values = [1, 2]
    const expected = [1, 2]

    pull(
      function (end: any, cb: any) {
        if (end) return cb(end)
        cb(null, values.shift())
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
          read(null, function (end: any, data: any) {
            if (end) {
              expect(result).toEqual(expected)
              return cb(end)
            }
            result.push(data)
            read(null, arguments.callee)
          })
        }
      }
    )(null, () => {})
  })
})