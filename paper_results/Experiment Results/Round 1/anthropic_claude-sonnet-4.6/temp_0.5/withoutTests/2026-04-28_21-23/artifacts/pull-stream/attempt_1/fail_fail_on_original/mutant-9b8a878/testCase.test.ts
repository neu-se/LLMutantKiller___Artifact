import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial application", () => {
  it("should correctly apply a partial sink with multiple through streams", () => {
    // Create a simple source that emits values 1, 2, 3 then ends
    const source = (end: any, cb: Function) => {
      let i = 0
      const values = [1, 2, 3]
      if (end) return cb(end)
      if (i >= values.length) return cb(true)
      cb(null, values[i++])
    }

    // Create a through stream that doubles values
    const double = (read: Function) => (end: any, cb: Function) => {
      read(end, (err: any, data: any) => {
        if (err) return cb(err)
        cb(null, data * 2)
      })
    }

    // Use partial application with a through stream that has length 1
    const partialPipeline = pull(double)
    
    // The partial should be a function
    expect(typeof partialPipeline).toBe("function")
    
    // Apply the partial to a source
    const resultStream = partialPipeline(source)
    
    // Collect results
    const results: number[] = []
    const collect = (read: Function) => {
      const drain = () => {
        read(null, (err: any, data: any) => {
          if (err === true) return
          if (err) throw err
          results.push(data)
          drain()
        })
      }
      drain()
    }
    
    collect(resultStream)
    expect(results).toEqual([2, 4, 6])
  })
})