import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial sink with exactly 2 through streams", () => {
  it("should return undefined (no sink) when partial sink with 2 throughs is applied to a source", () => {
    // Create a simple synchronous source
    let index = 0
    const values = [10, 20, 30]
    const source = (end: any, cb: (end: any, data?: number) => void) => {
      if (end) return cb(end)
      if (index >= values.length) return cb(true)
      cb(null, values[index++])
    }

    // Through stream that doubles values
    const double = (read: (end: any, cb: (end: any, data?: number) => void) => void) => {
      return (end: any, cb: (end: any, data?: number) => void) => {
        read(end, (end: any, data?: number) => {
          if (end) return cb(end)
          cb(null, data! * 2)
        })
      }
    }

    // Through stream that adds 1
    const addOne = (read: (end: any, cb: (end: any, data?: number) => void) => void) => {
      return (end: any, cb: (end: any, data?: number) => void) => {
        read(end, (end: any, data?: number) => {
          if (end) return cb(end)
          cb(null, data! + 1)
        })
      }
    }

    // Create partial sink with exactly 2 through streams
    const partialSink = pull(double, addOne)
    expect(typeof partialSink).toBe("function")

    // Apply the partial sink to the source - this triggers the case 2 branch
    // In original: pull(read, ref[0], ref[1]) - correct
    // In mutated: falls through to case 3: pull(read, ref[0], ref[1], ref[2]) where ref[2] is undefined
    // Passing undefined as a stream to pull should cause an error
    expect(() => {
      const resultStream = partialSink(source)
      // Force evaluation by reading from the result stream
      resultStream(null, (end: any, data?: number) => {})
    }).not.toThrow()

    // Reset index and verify correct results
    index = 0
    const partialSink2 = pull(double, addOne)
    const resultStream = partialSink2(source)

    const collected: number[] = []
    let done = false

    const next = () => {
      resultStream(null, (end: any, data?: number) => {
        if (end === true) { done = true; return }
        if (end) throw end
        collected.push(data!)
        next()
      })
    }
    next()

    expect(done).toBe(true)
    // double then addOne: 10->21, 20->41, 30->61
    expect(collected).toEqual([21, 41, 61])
  })
})