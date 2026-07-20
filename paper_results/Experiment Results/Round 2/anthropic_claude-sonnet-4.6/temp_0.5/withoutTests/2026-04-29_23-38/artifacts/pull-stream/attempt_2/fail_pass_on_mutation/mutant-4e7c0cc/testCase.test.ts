import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial application with exactly 3 arguments", () => {
  it("should correctly execute pipeline when partial sink has 3 arguments (case 3)", () => {
    const results: number[] = []

    function createSource(values: number[]) {
      let i = 0
      return (end: any, cb: (end: any, data?: number) => void) => {
        if (end) return cb(end)
        if (i >= values.length) return cb(true)
        cb(null, values[i++])
      }
    }

    function adder(n: number) {
      return (read: (end: any, cb: (end: any, data?: number) => void) => void) => {
        return (end: any, cb: (end: any, data?: number) => void) => {
          read(end, (end: any, data?: number) => {
            if (end) return cb(end)
            cb(null, data! + n)
          })
        }
      }
    }

    function collectSink(arr: number[]) {
      return (read: (end: any, cb: (end: any, data?: number) => void) => void) => {
        function next() {
          read(null, (end: any, data?: number) => {
            if (end) return
            arr.push(data!)
            next()
          })
        }
        next()
      }
    }

    // Create a partial sink with exactly 3 arguments
    // This sets length=3 inside pull, triggering case 3 in the switch
    // Original: pull(read, ref[0], ref[1], ref[2]) - correct
    // Mutated: falls through to case 4: pull(read, ref[0], ref[1], ref[2], ref[3])
    //          where ref[3] is undefined, causing the pipeline to break
    const partialSink = pull(adder(10), adder(100), collectSink(results))

    // partialSink should be a function (partial application)
    expect(typeof partialSink).toBe("function")

    // Apply the source to the partial sink
    partialSink(createSource([1, 2, 3]))

    // Each value: 1+10+100=111, 2+10+100=112, 3+10+100=113
    expect(results).toEqual([111, 112, 113])
  })
})