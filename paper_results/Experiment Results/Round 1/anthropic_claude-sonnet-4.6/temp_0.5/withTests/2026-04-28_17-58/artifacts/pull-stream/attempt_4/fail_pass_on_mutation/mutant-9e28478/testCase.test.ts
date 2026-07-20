import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull partial application with exactly 2 through-streams', () => {
  it('should correctly pipe through 2 transforms when using partial application', () => {
    // Create a simple stateful source
    const makeSource = (values: number[]) => {
      let i = 0
      return (abort: any, cb: Function) => {
        if (abort) return cb(abort)
        if (i >= values.length) return cb(true)
        cb(null, values[i++])
      }
    }

    // Two simple through-streams
    const double = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data * 2)
      })
    }

    const addTen = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data + 10)
      })
    }

    // Partial application with exactly 2 through-streams triggers case 2
    // Original: return pull(read, ref[0], ref[1])  -> correct
    // Mutant:   falls through to case 3: return pull(read, ref[0], ref[1], ref[2])
    //           where ref[2] === undefined, causing TypeError when pull tries to use it
    const pipeline = pull(double, addTen)

    expect(() => {
      const source = makeSource([1, 2, 3])
      const read = pipeline(source)

      // Drain all values
      const results: number[] = []
      const drain = (abort: any, cb: Function) => {
        read(null, function next(end: any, data: any) {
          if (end) return cb(end)
          results.push(data)
          read(null, next)
        })
      }

      // Trigger the drain synchronously
      let done = false
      drain(null, () => { done = true })

      expect(results).toEqual([12, 14, 16])
    }).not.toThrow()
  })
})