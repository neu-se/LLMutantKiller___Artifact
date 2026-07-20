import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should correctly handle a duplex object in the middle of a pipeline", () => {
    const values = [1, 2, 3]
    let i = 0
    
    function source(end: any, cb: Function) {
      if (end || i >= values.length) return cb(true)
      cb(null, values[i++])
    }
    
    // Duplex object that doubles values
    let capturedRead: Function
    const duplex = {
      sink(read: Function) { capturedRead = read },
      source: function(end: any, cb: Function) {
        capturedRead(end, function(e: any, data: any) {
          if (e) return cb(e)
          cb(null, data * 2)
        })
      }
    }
    
    // Function through that adds 1
    function addOne(read: Function) {
      return function(end: any, cb: Function) {
        read(end, function(e: any, data: any) {
          if (e) return cb(e)
          cb(null, data + 1)
        })
      }
    }
    
    const results: number[] = []
    let done = false
    
    const finalRead = pull(source, duplex, addOne)
    
    function drain() {
      finalRead(null, function(end: any, data: any) {
        if (end) { done = true; return }
        results.push(data)
        drain()
      })
    }
    drain()
    
    expect(done).toBe(true)
    expect(results).toEqual([3, 5, 7])
  })
})