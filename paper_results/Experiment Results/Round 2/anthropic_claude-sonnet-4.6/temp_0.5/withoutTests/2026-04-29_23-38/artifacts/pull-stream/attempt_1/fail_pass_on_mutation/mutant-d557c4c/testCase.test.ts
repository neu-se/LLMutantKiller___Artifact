import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull with function through-stream", () => {
  it("should correctly pipe through a function-based through-stream without treating it as an object", (done) => {
    // Create a simple source that emits values 1, 2, 3 then ends
    function source(end: any, cb: Function) {
      if (end) return cb(end)
      let i = 0
      const values = [1, 2, 3]
      return function(end: any, cb: Function) {
        if (end || i >= values.length) return cb(true)
        cb(null, values[i++])
      }
    }

    // Create a through-stream as a plain function (no .sink or .source properties)
    function double(read: Function) {
      return function(end: any, cb: Function) {
        read(end, function(end: any, data: any) {
          if (end) return cb(end)
          cb(null, data * 2)
        })
      }
    }

    // Create a sink that collects results
    const results: number[] = []
    function sink(read: Function) {
      function next() {
        read(null, function(end: any, data: any) {
          if (end) {
            expect(results).toEqual([2, 4, 6])
            done()
            return
          }
          results.push(data)
          next()
        })
      }
      next()
    }

    // In the original, double is a function so only read = s(read) is called
    // In the mutated version, it would also try s.sink(read) which would throw
    // since double.sink is undefined
    pull(source(null, () => {}), double, sink)
  })
})