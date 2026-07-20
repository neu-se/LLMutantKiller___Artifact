import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js"

describe('find', () => {
  it('should pass actual errors to callback when no item is found', (done) => {
    const actualError = new Error('stream error')
    
    // Create a source that ends with an actual error after yielding one item that doesn't match
    let count = 0
    const source = (end: any, cb: Function) => {
      if (end) return cb(end)
      if (count === 0) {
        count++
        cb(null, 1) // yield item that won't match test
      } else {
        cb(actualError) // end with actual error
      }
    }
    
    const sink = find((x: number) => x > 100, (err: any, data: any) => {
      // Original: err should be actualError (not null)
      // Mutated: err would be null (bug)
      expect(err).toBe(actualError)
      expect(data).toBeNull()
      done()
    })
    
    sink(source)
  })
})