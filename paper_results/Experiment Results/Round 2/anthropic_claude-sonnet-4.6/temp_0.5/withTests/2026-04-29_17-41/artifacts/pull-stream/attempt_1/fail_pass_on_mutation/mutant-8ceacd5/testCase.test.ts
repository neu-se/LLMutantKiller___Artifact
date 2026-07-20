import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull with 5 or more arguments (default case)", () => {
  it("should correctly pipe through 5 arguments (source + 4 throughs)", (done) => {
    // This requires the default case: ref.unshift(read) + pull.apply(null, ref)
    // With 5 arguments, length=5, which hits the default case in the switch
    const results: number[] = []

    const source = (abort: any, cb: Function) => {
      const values = [1, 2, 3]
      let i = 0
      return function read(abort: any, cb: Function) {
        if (abort) return cb(abort)
        if (i >= values.length) return cb(true)
        cb(null, values[i++])
      }
    }

    // Create a simple through stream factory
    function makeThrough(multiplier: number) {
      return function (read: Function) {
        return function (abort: any, cb: Function) {
          read(abort, function (end: any, data: any) {
            if (end) return cb(end)
            cb(null, data * multiplier)
          })
        }
      }
    }

    // Create a simple source
    function makeSource(values: number[]) {
      let i = 0
      return function (abort: any, cb: Function) {
        if (abort) return cb(abort)
        if (i >= values.length) return cb(true)
        cb(null, values[i++])
      }
    }

    // Create a sink (collect)
    function collect(cb: Function) {
      return function (read: Function) {
        const collected: number[] = []
        read(null, function next(end: any, data: any) {
          if (end) return cb(end === true ? null : end, collected)
          collected.push(data)
          read(null, next)
        })
      }
    }

    // Use pull with 5 arguments: source + 3 throughs + sink
    // This means length=5, which hits the default case
    const partialPipeline = pull(
      makeThrough(2),
      makeThrough(1),
      makeThrough(1),
      collect(function (err: any, results: number[]) {
        expect(err).toBeNull()
        expect(results).toEqual([2, 4, 6])
        done()
      })
    )

    // partialPipeline is a function that accepts a read source
    // Now call it with a source - this triggers the default case
    // Actually, let's use pull directly with 5 args
    pull(
      makeSource([1, 2, 3]),
      makeThrough(2),
      makeThrough(1),
      makeThrough(1),
      collect(function (err: any, res: number[]) {
        expect(err).toBeNull()
        expect(res).toEqual([2, 4, 6])
        done()
      })
    )
  })
})