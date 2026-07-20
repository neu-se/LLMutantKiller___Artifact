import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull partial sink called twice', () => {
  it('should throw TypeError when a partial sink is called more than once', () => {
    function map(mapper: (x: number) => number) {
      return function (read: Function) {
        return function (abort: any, cb: Function) {
          read(abort, function (end: any, data: any) {
            if (end) cb(end)
            else cb(null, mapper(data))
          })
        }
      }
    }

    function sum(done: Function) {
      return function (read: Function) {
        let total = 0
        read(null, function next(end: any, data: any) {
          if (end) return done(end === true ? null : end, total)
          total += data
          read(null, next)
        })
      }
    }

    const stream = pull(
      map((e: number) => e * e),
      sum(function (_err: any, _value: any) {})
    )

    let i = 0
    const arr = [1, 2, 3]
    const source = function (abort: any, cb: Function) {
      if (abort) { cb(abort); return }
      if (i >= arr.length) { cb(true); return }
      cb(null, arr[i++])
    }

    stream(source)

    expect(() => {
      stream(source)
    }).toThrow(TypeError)
  })
})