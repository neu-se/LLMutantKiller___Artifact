import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull with source object", () => {
  it("should extract source from an object with a source function when passed as first argument", () => {
    // Create a simple source that emits values
    const values = [1, 2, 3]
    let index = 0
    
    const sourceRead = (end: any, cb: Function) => {
      if (end) return cb(end)
      if (index >= values.length) return cb(true)
      cb(null, values[index++])
    }
    
    // Create an object that has both sink and source (like a through stream)
    // but we pass it as the first argument (source position)
    const sourceObject = {
      source: sourceRead
    }
    
    // Create a sink that collects values
    const collected: number[] = []
    
    const sink = (read: Function) => {
      const drain = () => {
        read(null, (end: any, data: any) => {
          if (end === true) return
          if (end) throw end
          collected.push(data)
          drain()
        })
      }
      drain()
    }
    
    // In the original code, pull(sourceObject, sink) should extract sourceObject.source
    // and use it as the read function, then pass it to sink
    pull(sourceObject, sink)
    
    // If the mutation is present, sourceObject itself (not sourceObject.source) 
    // would be passed to sink, and calling it as a function would fail or behave differently
    expect(collected).toEqual([1, 2, 3])
  })
})