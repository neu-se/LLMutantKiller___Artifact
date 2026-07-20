import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js"

describe('drain without done callback', () => {
  it('should warn and throw when stream ends with error and no done callback is provided', () => {
    // Create a source that emits an error
    const testError = new Error('test stream error')
    let callCount = 0
    
    const source = (_abort: any, cb: Function) => {
      callCount++
      if (callCount === 1) {
        // First call: emit an error
        cb(testError, null)
      }
    }

    const originalWarn = console.warn
    const warnCalls: any[] = []
    console.warn = (...args: any[]) => {
      warnCalls.push(args)
    }

    try {
      // Create drain without a done callback
      const sink = drain(null, null)
      
      // Connect the source to the sink - this should throw the error
      expect(() => {
        sink(source)
      }).toThrow('test stream error')
      
      // In original code, console.warn should have been called with the doneLackingErr
      // because the `if (!done)` block runs and creates doneLackingErr
      expect(warnCalls.length).toBe(1)
      expect(warnCalls[0][0]).toBeInstanceOf(Error)
      expect(warnCalls[0][0].message).toBe('no done callback supplied')
    } finally {
      console.warn = originalWarn
    }
  })
})