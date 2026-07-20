import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js"

describe("asyncMap with no map function", () => {
  it("should return identity function that passes through the stream unchanged when no map is provided", (done) => {
    // When asyncMap is called with no argument (falsy), it returns the `id` function
    // The original `id` function returns `e`, so it returns the through stream itself
    // The mutated `id` function returns undefined, so the through stream is lost
    
    const through = asyncMap(null)
    
    // The original id function should return the argument passed to it (the read function)
    // So `through` itself should be a function that when called with a read function,
    // returns the read function unchanged (identity behavior)
    
    // Create a simple source that emits values
    const values = [1, 2, 3]
    let index = 0
    
    const source = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      if (index >= values.length) return cb(true)
      cb(null, values[index++])
    }
    
    // When map is falsy, asyncMap returns `id` which is applied to the source
    // Original: id(source) returns source (identity)
    // Mutated: id(source) returns undefined
    const result = through(source)
    
    // The result should be a function (the source itself in the original)
    // In the mutated version, result would be undefined
    expect(typeof result).toBe("function")
    
    // Verify the result actually works as a stream
    const collected: number[] = []
    
    const readNext = () => {
      result(null, (end: any, data: any) => {
        if (end === true) {
          expect(collected).toEqual([1, 2, 3])
          done()
        } else if (end) {
          done(end)
        } else {
          collected.push(data)
          readNext()
        }
      })
    }
    
    readNext()
  })
})