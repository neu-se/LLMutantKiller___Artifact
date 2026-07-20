import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial sink called twice throws TypeError with specific message", () => {
  it("should throw a TypeError with the message 'partial sink should only be called once!' when a partial sink is called twice", () => {
    const map = function(mapper: (x: any) => any) {
      return function(read: Function) {
        return function(abort: any, cb: Function) {
          read(abort, function(end: any, data: any) {
            if (end) cb(end)
            else cb(null, mapper(data))
          })
        }
      }
    }

    const sum = function(done: Function) {
      return function(read: Function) {
        var total = 0
        read(null, function next(end: any, data: any) {
          if (end) return done(end === true ? null : end, total)
          total += data
          read(null, next)
        })
      }
    }

    const stream = pull(
      map(function(e: number) { return e * e }),
      sum(function(err: any, value: any) {})
    )

    const values = function(array: number[]) {
      var i = 0
      return function(abort: any, cb: Function) {
        if (abort) { i = array.length; cb(abort) }
        else if (i >= array.length) cb(true)
        else cb(null, array[i++])
      }
    }

    stream(values([1, 2, 3, 4, 5]))

    let thrownError: any = null
    try {
      stream(values([1, 2, 3, 4, 5]))
    } catch (e) {
      thrownError = e
    }

    expect(thrownError).toBeInstanceOf(TypeError)
    expect(thrownError.message).toBe("partial sink should only be called once!")
  })
})