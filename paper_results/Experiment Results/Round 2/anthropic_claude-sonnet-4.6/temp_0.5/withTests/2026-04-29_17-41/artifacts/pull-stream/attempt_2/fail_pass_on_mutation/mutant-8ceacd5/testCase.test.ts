import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial application with 4 arguments (case 4 in switch)", () => {
  it("should correctly handle partial pull with 4 through-stream arguments", (done) => {
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

    function collect(cb: Function) {
      return function (read: Function) {
        const results: number[] = []
        read(null, function next(end: any, data: any) {
          if (end) return cb(end === true ? null : end, results)
          results.push(data)
          read(null, next)
        })
      }
    }

    // Create a partial pipeline with exactly 4 arguments
    // This triggers the partial application path (first arg is function with length=1)
    // and length=4 hits case 4 in the switch
    const partialPipeline = pull(
      makeThrough((x) => x + 1),
      makeThrough((x) => x * 2),
      makeThrough((x) => x - 1),
      collect(function (err: any, results: number[]) {
        expect(err).toBeNull()
        expect(results).toEqual([3, 5, 7])
        done()
      })
    )

    // partialPipeline should be a function that accepts a read source
    expect(typeof partialPipeline).toBe("function")

    // Apply the source to complete the pipeline
    partialPipeline(makeSource([1, 2, 3]))
  })
})