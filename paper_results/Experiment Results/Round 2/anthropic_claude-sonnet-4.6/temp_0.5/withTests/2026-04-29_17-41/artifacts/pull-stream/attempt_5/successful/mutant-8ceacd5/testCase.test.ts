import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull with 5 args in partial application path hitting default case", () => {
  it("should correctly pipe through when partial pull is called with 5 args (length=5, hits default)", (done) => {
    function makeSource(values: number[]) {
      let i = 0
      return function (abort: any, cb: Function) {
        if (abort) return cb(abort)
        if (i >= values.length) return cb(true)
        cb(null, values[i++])
      }
    }

    function makeThrough(fn: (x: number) => number) {
      // .length === 1, triggers partial application
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

    // 5 args: length=5, first arg has .length===1 -> partial path
    // switch(5): no case 5, hits default
    // Original default: ref.unshift(read), return pull.apply(null, ref) -> works
    // Mutated default: empty body, returns undefined -> partial(source) does nothing
    const partial = pull(
      makeThrough((x) => x * 2),  // arg1, length===1
      makeThrough((x) => x),       // arg2
      makeThrough((x) => x),       // arg3
      makeThrough((x) => x),       // arg4
      sink                          // arg5
    )

    // On original: partial is a function that completes the pipeline
    // On mutated: partial returns undefined, calling it does nothing
    partial(makeSource([1, 2, 3]))
  })
})