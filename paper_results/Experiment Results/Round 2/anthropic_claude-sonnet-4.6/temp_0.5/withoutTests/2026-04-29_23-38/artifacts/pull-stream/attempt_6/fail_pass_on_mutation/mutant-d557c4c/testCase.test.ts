import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should correctly handle duplex object streams by calling sink and using source", () => {
    const values = [1, 2, 3]
    let i = 0
    
    function source(end: any, cb: Function) {
      if (end || i >= values.length) return cb(true)
      cb(null, values[i++])
    }
    
    const collected: number[] = []
    let ended = false
    
    // Duplex object: transforms by doubling
    let capturedRead: Function
    const duplex = {
      sink(read: Function) {
        capturedRead = read
      },
      source: function(end: any, cb: Function) {
        capturedRead(end, function(e: any, data: any) {
          if (e) return cb(e)
          cb(null, data * 2)
        })
      }
    }
    
    function sink(read: Function) {
      function next() {
        read(null, function(end: any, data: any) {
          if (end) { ended = true; return }
          collected.push(data)
          next()
        })
      }
      next()
    }
    
    pull(source, duplex, sink)
    
    expect(ended).toBe(true)
    expect(collected).toEqual([2, 4, 6])
  })
})