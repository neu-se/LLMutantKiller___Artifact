import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull with source object", () => {
  it("should unwrap source from a duplex/through object when passed as first argument", () => {
    // Create a simple readable source that produces values
    const values = [1, 2, 3]
    let index = 0
    
    const source = (end: any, cb: Function) => {
      if (end) return cb(end)
      if (index >= values.length) return cb(true)
      cb(null, values[index++])
    }
    
    // Create a duplex object with both sink and source
    // This simulates a through/duplex stream
    const duplexObject = {
      sink: (read: Function) => {
        // The sink receives the upstream reader
      },
      source: source
    }
    
    // When pull receives a duplex object as first argument,
    // it should unwrap the .source from it
    // The mutation removes: read = read.source
    // So in the mutated version, read remains the duplexObject instead of duplexObject.source
    
    const result = pull(duplexObject)
    
    // In original: result should be duplexObject.source (a function)
    // In mutated: result should be duplexObject (the object itself)
    expect(typeof result).toBe("function")
    
    // Further verify it's actually the source function by calling it
    const collected: number[] = []
    let done = false
    
    const drain = (read: Function) => {
      const next = () => {
        read(null, (end: any, data: any) => {
          if (end === true) {
            done = true
            return
          }
          if (end) throw end
          collected.push(data)
          next()
        })
      }
      next()
    }
    
    drain(result as Function)
    
    expect(done).toBe(true)
    expect(collected).toEqual([1, 2, 3])
  })
})