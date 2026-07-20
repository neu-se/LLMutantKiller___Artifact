import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull partial sink called twice', () => {
  it('should throw TypeError when a partial pull sink is called more than once', () => {
    function values(array: number[]) {
      let i = 0
      return function (abort: any, cb: Function) {
        if (abort) { i = array.length; cb(abort) }
        else if (i >= array.length) cb(true)
        else cb(null, array[i++])
      }
    }

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

    // Create a partial pipeline (starts with a through, ends with a sink)
    // When first argument is a function with length === 1, pull returns a partial sink
    const stream = pull(
      map((e: number) => e * e),
      sum(function (_err: any, _value: any) {})
    )

    // First call should succeed
    stream(values([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))

    // Second call should throw TypeError in original code, but NOT throw in mutated code
    expect(() => {
      stream(values([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
    }).toThrow(TypeError)
  })
})