import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should handle args array correctly in partial application", () => {
    // Test that verifies the args array has the right elements
    // by checking the pipeline produces correct results
    
    const results: number[] = []
    
    // Create a source that emits values synchronously
    const values = [1, 2, 3]
    let idx = 0
    const source = function(end: any, cb: Function) {
      if (end) return cb(end)
      if (idx >= values.length) return cb(true)
      cb(null, values[idx++])
    }
    
    // Create a sink that collects values
    const sink = function(read: Function) {
      function next() {
        read(null, function(end: any, data: any) {
          if (end === true) return
          if (end) throw end
          results.push(data)
          next()
        })
      }
      next()
    }
    // sink has .length === 1
    
    // Create through streams
    const double = (read: Function) => (end: any, cb: Function) =>
      read(end, (err: any, data: any) => err ? cb(err) : cb(null, data * 2))
    
    // pull(double, sink) - both have .length === 1
    // a = double, a.length === 1 -> partial path
    // length = 2, args = new Array(2) or new Array()
    // After loop: args = [double, sink]
    // Returns partial function
    // partial(source) -> switch(2): pull(source, ref[0], ref[1]) = pull(source, double, sink)
    
    const partial = pull(double, sink)
    partial(source)
    
    expect(results).toEqual([2, 4, 6])
  })
})