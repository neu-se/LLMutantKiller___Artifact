import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull with source object having source as function", () => {
  it("should unwrap source from object when source property is a function", () => {
    // Create a simple readable source
    const values = [1, 2, 3]
    let index = 0
    
    const readFn = (end: any, cb: Function) => {
      if (end) return cb(end)
      if (index >= values.length) return cb(true)
      cb(null, values[index++])
    }
    
    // Create an object with a source property that is a function (readable)
    const sourceObj = {
      source: readFn
    }
    
    // When pull receives an object with a source property that is a function,
    // it should unwrap it and use source as the read function
    const result: any[] = []
    
    return new Promise<void>((resolve, reject) => {
      // Create a sink that collects values
      const sink = (read: Function) => {
        const drain = () => {
          read(null, (end: any, data: any) => {
            if (end === true) {
              resolve()
              return
            }
            if (end) {
              reject(end)
              return
            }
            result.push(data)
            drain()
          })
        }
        drain()
      }
      
      // Pull with sourceObj - in original code, it detects source is a function and unwraps it
      // In mutated code, typeof read.source === "" is always false, so it won't unwrap
      pull(sourceObj, sink)
    }).then(() => {
      expect(result).toEqual([1, 2, 3])
    })
  })
})