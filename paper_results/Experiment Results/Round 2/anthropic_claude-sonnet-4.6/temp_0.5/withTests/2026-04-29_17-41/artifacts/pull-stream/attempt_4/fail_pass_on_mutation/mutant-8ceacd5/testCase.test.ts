import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial application case 4 missing ref.unshift(read)", () => {
  it("should include the source read function when completing a 4-arg partial pipeline", (done) => {
    function makeSource(values: number[]) {
      let i = 0
      return function (abort: any, cb: Function) {
        if (abort) return cb(abort)
        if (i >= values.length) return cb(true)
        cb(null, values[i++])
      }
    }

    function makeThrough(fn: (x: number) => number) {
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

    function sink(read: Function) {
      read(null, function next(end: any, data: any) {
        if (end) {
          expect(collected).toEqual([2, 4, 6])
          done()
          return
        }
        collected.push(data)
        read(null, next)
      })
    }

    // 4 args: length=4, hits case 4 -> default
    // Original: ref.unshift(read), then pull.apply(null, ref) -> works
    // Mutated: no unshift, pull.apply(null, ref) called WITHOUT read prepended
    //          so ref[0] (makeThrough) gets called as source, not as through
    const partial = pull(
      makeThrough((x) => x * 2),
      makeThrough((x) => x),
      makeThrough((x) => x),
      sink
    )

    partial(makeSource([1, 2, 3]))
  })
})