import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull with non-object, non-function argument", () => {
  it("should handle a pipeline where a through-stream is a plain function (not object)", () => {
    // A simple through function that transforms data
    const through = (read: Function) => (end: any, cb: Function) => {
      read(end, (err: any, data: any) => {
        if (err) return cb(err)
        cb(null, data * 2)
      })
    }

    // A source that produces values
    const source = (end: any, cb: Function) => {
      cb(null, 5)
    }

    // In the original, typeof s === 'function' is handled first
    // In the mutated code, the else if (true) would try s.sink(read) on a function
    // which would fail since functions don't have .sink()
    
    const result = pull(source, through)
    
    // result should be a readable function
    expect(typeof result).toBe("function")
    
    // Call it to get a value
    let value: any
    result(null, (err: any, data: any) => {
      value = data
    })
    
    expect(value).toBe(10)
  })
})