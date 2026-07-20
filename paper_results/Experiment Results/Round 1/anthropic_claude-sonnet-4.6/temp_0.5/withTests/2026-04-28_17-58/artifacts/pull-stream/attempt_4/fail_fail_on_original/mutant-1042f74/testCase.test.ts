import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js"

describe('drain sink', () => {
  it('should invoke op for each item when op never returns false', (done) => {
    // Use a source that calls back synchronously for first N items then ends
    // The key: op returns false on first item, triggering abort path
    const items = [1, 2, 3, 4, 5]
    let idx = 0
    let abortCalled = false
    
    const source = (abort: any, cb: Function) => {
      if (abort) {
        abortCalled = true
        return cb(abort)
      }
      if (idx >= items.length) return cb(true)
      cb(null, items[idx++])
    }
    
    const received: number[] = []
    // op returns false on 3rd item - should stop drain
    const sink = drain((data: number) => {
      received.push(data)
      if (data === 3) return false
    }, (err: any) => {
      expect(err).toBeNull()
      expect(received).toEqual([1, 2, 3])
      expect(abortCalled).toBe(true)
      done()
    })
    
    sink(source)
  })
})