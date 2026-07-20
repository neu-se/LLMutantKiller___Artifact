import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull with duplex object", () => {
  it("should correctly wire up a duplex object stream", () => {
    const values = [1, 2, 3]
    let i = 0
    
    function source(end: any, cb: Function) {
      if (end || i >= values.length) return cb(true)
      cb(null, values[i++])
    }
    
    // Duplex object: has sink (accepts read) and source (a read function)
    let internalRead: Function
    const duplex = {
      sink: function(read: Function) {
        internalRead = read
      },
      get source() {
        return function(end: any, cb: Function) {
          internalRead(end, function(end: any, data: any) {
            if (end) return cb(end)
            cb(null, data * 2)
          })
        }
      }
    }
    
    const result = pull(source, duplex)
    
    const collected: number[] = []
    let ended = false
    
    function step() {
      result(null, function(end: any, data: any) {
        if (end) { ended = true; return }
        collected.push(data)
        step()
      })
    }
    step()
    
    expect(ended).toBe(true)
    expect(collected).toEqual([2, 4, 6])
  })
})