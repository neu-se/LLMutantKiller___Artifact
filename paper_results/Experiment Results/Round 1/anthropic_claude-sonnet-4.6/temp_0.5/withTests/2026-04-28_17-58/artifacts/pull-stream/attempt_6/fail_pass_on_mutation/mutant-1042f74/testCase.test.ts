import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js"

describe('drain sink', () => {
  it('should read all items from mixed sync/async source', (done) => {
    // Source alternates: first call sync, second async, etc.
    const items = [1, 2, 3]
    let idx = 0
    let callCount = 0
    
    const source = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      const i = idx++
      callCount++
      if (i >= items.length) {
        // End the stream - call synchronously on even calls, async on odd
        if (callCount % 2 === 0) {
          cb(true)
        } else {
          setImmediate(() => cb(true))
        }
        return
      }
      // Data: call synchronously on even calls, async on odd  
      if (callCount % 2 === 0) {
        cb(null, items[i])
      } else {
        setImmediate(() => cb(null, items[i]))
      }
    }
    
    const received: number[] = []
    const sink = drain((data: number) => {
      received.push(data)
    }, (err: any) => {
      expect(err).toBeNull()
      expect(received).toEqual([1, 2, 3])
      done()
    })
    
    sink(source)
  })
})