import { pull } from '../../../pull.js'

describe('pull stream', () => {
  it('should handle object and function correctly', () => {
    const s = function (read: any) {
      return function (end: any, cb: any) {
        read(end, function (end: any, data: any) {
          if (end) return cb(end)
          if (typeof data === 'object') {
            cb(null, data)
          } else {
            cb(null, data)
          }
        })
      }
    }

    const read = pull(
      pull.values([{}]),
      s,
      pull.collect((err: any, ary: any) => {
        if (err) throw err
        expect(ary).toEqual([{}])
      })
    )
    read(null, () => { })
  })
})