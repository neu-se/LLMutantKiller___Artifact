import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull-stream', () => {
  it('should handle two arguments correctly', () => {
    const read = pull(
      (read: any) => {
        return function (end: any, cb: any) {
          if (end) return cb(end)
          cb(null, 1)
        }
      },
      (read: any) => {
        return function (end: any, cb: any) {
          if (end) return cb(end)
          read(null, function (end: any, data: any) {
            cb(null, data * 2)
          })
        }
      }
    )

    let result: number | null = null
    read(null, (end: any, data: number) => {
      if (end) return
      result = data
    })

    expect(result).toEqual(2)
  })
})