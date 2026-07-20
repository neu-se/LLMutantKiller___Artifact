import { pull } from '../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull stream', () => {
  it('should handle object and function correctly', () => {
    const read = pull(
      pull.values([{}]),
      (read: any) => {
        return function (abort: any, cb: any) {
          read(abort, function (end: any, data: any) {
            if (end) return cb(end)
            if (typeof data === 'object') {
              cb(null, data)
            } else {
              cb(null, data)
            }
          })
        }
      },
      pull.collect((err: any, ary: any) => {
        if (err) throw err
        expect(ary).toEqual([{}])
      })
    )
    read(null, () => { })
  })
})