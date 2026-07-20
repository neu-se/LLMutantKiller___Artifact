import { pull } from '../../../pull'

describe('pull stream', () => {
  it('should handle object and function correctly', () => {
    const obj = { foo: 'bar' }
    const s = function (read: any) {
      return function (end: any, cb: any) {
        read(end, function (end: any, data: any) {
          if (end) return cb(end)
          if (typeof data === 'object' && data !== null) {
            cb(null, data)
          } else {
            cb(null, data)
          }
        })
      }
    }

    const read = pull(
      pull.values([obj]),
      s,
      pull.collect((err: any, ary: any) => {
        if (err) throw err
        expect(ary).toEqual([obj])
      })
    )
    read(null, () => { })
  })
})