import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull with object-based duplex stream", () => {
  it("should only treat objects (not functions) as duplex streams with sink/source", () => {
    const values = [1, 2, 3]
    let i = 0

    function source(end: any, cb: Function) {
      if (end || i >= values.length) return cb(true)
      cb(null, values[i++])
    }

    // A plain function through-stream
    function double(read: Function) {
      return function(end: any, cb: Function) {
        read(end, function(end: any, data: any) {
          if (end) return cb(end)
          cb(null, data * 2)
        })
      }
    }

    // pull(source, double) should return the transformed read function
    // In original: returns double(source) - a function
    // In mutated: after double(source), tries s.sink(read) which throws TypeError
    const result = pull(source, double)
    
    // The result should be a callable function (the transformed read)
    expect(typeof result).toBe('function')
    
    // And it should actually work - collect values
    const collected: number[] = []
    function drain(read: Function) {
      function next() {
        read(null, function(end: any, data: any) {
          if (end) return
          collected.push(data)
          next()
        })
      }
      next()
    }
    
    drain(result)
    expect(collected).toEqual([2, 4, 6])
  })
})