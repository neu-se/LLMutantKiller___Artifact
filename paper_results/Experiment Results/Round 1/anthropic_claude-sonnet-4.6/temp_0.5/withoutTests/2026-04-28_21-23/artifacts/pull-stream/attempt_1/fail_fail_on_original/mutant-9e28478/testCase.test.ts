import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull with partial sink of length 2", () => {
  it("should correctly apply two through streams when creating a partial sink with 2 arguments", () => {
    // Create a simple source that emits values 1, 2, 3, then ends
    function source(end: any, cb: Function) {
      if (end) return cb(end)
      let i = 0
      const values = [1, 2, 3]
      return function next(end: any, cb: Function) {
        if (end) return cb(end)
        if (i >= values.length) return cb(true)
        cb(null, values[i++])
      }
    }

    // Create a through stream that doubles values
    function double(read: Function) {
      return function(end: any, cb: Function) {
        read(end, function(end: any, data: any) {
          if (end) return cb(end)
          cb(null, data * 2)
        })
      }
    }

    // Create a through stream that adds 10
    function addTen(read: Function) {
      return function(end: any, cb: Function) {
        read(end, function(end: any, data: any) {
          if (end) return cb(end)
          cb(null, data + 10)
        })
      }
    }

    // Create a partial sink with 2 through streams
    const partialSink = pull(double, addTen)

    // partialSink should be a function that accepts a read source
    expect(typeof partialSink).toBe("function")

    // Apply the partial sink to a source
    const resultRead = partialSink(source(null, () => {}))

    // Actually, let's use a proper source
    const values: number[] = []
    
    // Create a proper readable source
    let idx = 0
    const sourceValues = [1, 2, 3]
    function properSource(end: any, cb: Function) {
      if (end) return cb(end)
      if (idx >= sourceValues.length) return cb(true)
      cb(null, sourceValues[idx++])
    }

    // Apply partial sink to source - this should apply both through streams
    const result = partialSink(properSource)

    // result should be a readable (function)
    expect(typeof result).toBe("function")

    // Read all values from result
    const collected: number[] = []
    
    function drain(read: Function, done: Function) {
      function next() {
        read(null, function(end: any, data: any) {
          if (end === true) return done(null, collected)
          if (end) return done(end)
          collected.push(data)
          next()
        })
      }
      next()
    }

    let finished = false
    let error: any = null
    let finalValues: number[] = []

    drain(result, (err: any, vals: number[]) => {
      finished = true
      error = err
      finalValues = vals || collected
    })

    // Since drain calls are synchronous in this case, check results
    expect(finished).toBe(true)
    expect(error).toBeNull()
    // double(1) = 2, addTen(2) = 12
    // double(2) = 4, addTen(4) = 14
    // double(3) = 6, addTen(6) = 16
    expect(finalValues).toEqual([12, 14, 16])
  })
})