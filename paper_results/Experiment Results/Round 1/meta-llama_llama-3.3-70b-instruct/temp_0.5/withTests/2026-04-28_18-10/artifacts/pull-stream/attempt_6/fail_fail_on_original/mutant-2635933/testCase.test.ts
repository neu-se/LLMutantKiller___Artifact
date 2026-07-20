import pull from '../pull'

describe('pull stream', () => {
  it('should handle object and function correctly', () => {
    const obj = { foo: 'bar' }
    const read = pull(
      pull.values([obj]),
      (read: any) => {
        return function (abort: any, cb: any) {
          read(abort, function (end: any, data: any) {
            if (end) return cb(end)
            if (typeof data === 'object' && data !== null) {
              cb(null, data)
            } else {
              cb(new Error('Expected object'))
            }
          })
        }
      },
      pull.collect((err: any, ary: any) => {
        if (err) throw err
        expect(ary).toEqual([obj])
      })
    )
    read(null, () => { })
  })
})