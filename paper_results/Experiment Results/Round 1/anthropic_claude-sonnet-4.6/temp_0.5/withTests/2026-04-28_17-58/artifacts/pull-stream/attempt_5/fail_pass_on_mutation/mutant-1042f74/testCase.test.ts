import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js"

describe('drain sink', () => {
  it('should handle a source that ends immediately without calling op', (done) => {
    // Empty source - ends on first read
    const source = (abort: any, cb: Function) => {
      cb(true) // immediately end
    }
    
    let opCalled = false
    const sink = drain((data: any) => {
      opCalled = true
    }, (err: any) => {
      expect(err).toBeNull()
      expect(opCalled).toBe(false)
      done()
    })
    
    sink(source)
  })
})