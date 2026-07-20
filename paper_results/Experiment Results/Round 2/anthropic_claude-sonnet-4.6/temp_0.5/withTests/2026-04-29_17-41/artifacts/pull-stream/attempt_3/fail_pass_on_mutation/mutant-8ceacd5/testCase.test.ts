import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial application hitting case 4 / default", () => {
  it("should return a working pipeline when partial pull is called with 4 args", (done) => {
    function makeSource(values: number[]) {
      let i = 0
      return function (abort: any, cb: Function) {
        if (abort) return cb(abort)
        if (i >= values.length) return cb(true)
        cb(null, values[i++])
      }
    }

    function makeThrough(fn: (x: number) => number) {
      // length === 1, triggers partial application path
      return function (read: Function) {
        return function (abort: any, cb: Function) {
          read(abort, function (end: any, data: any) {
            if (end) return cb(end)
            cb(null, fn(data))
          })
        }
      }
    }

    const collected: number[] = []
    let ended = false

    // Sink function with length === 1
    function sink(read: Function) {
      read(null, function next(end: any, data: any) {
        if (end) {
          ended = true
          expect(collected).toEqual([2, 4, 6])
          done()
          return
        }
        collected.push(data)
        read(null, next)
      })
    }

    // Pull called with exactly 4 args, first arg has .length === 1
    // This creates a partial pipeline (length=4 in the switch)
    const partial = pull(
      makeThrough((x) => x * 2),  // arg 1, length===1, triggers partial path
      makeThrough((x) => x),       // arg 2
      makeThrough((x) => x),       // arg 3
      sink                          // arg 4
    )

    // partial should be a function; calling it with a source completes the pipeline
    // On original: case 4 falls to default, does ref.unshift(read), returns pull.apply(null, ref)
    // On mutated: case 4 has no body, returns undefined -> calling partial(source) does nothing
    partial(makeSource([1, 2, 3]))
  })
})