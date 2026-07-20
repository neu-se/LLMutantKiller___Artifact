import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull-stream', () => {
  it('should handle two arguments correctly', () => {
    const read = pull(
      function (end: any, cb: any) {
        if (end) return cb(end)
        cb(null, 1)
        cb(null, 2)
      },
      function (read: any) {
        return function (end: any, cb: any) {
          if (end) return cb(end)
          read(null, function (end: any, data: any) {
            if (end) return cb(end)
            cb(null, data)
          })
        }
      }
    )

    let result: number[] = []
    read(null, (end: any, data: number) => {
      if (end) return
      result.push(data)
    })

    read(null, (end: any, data: number) => {
      if (end) return
      result.push(data)
    })

    expect(result.length).toBe(2)
  })
})