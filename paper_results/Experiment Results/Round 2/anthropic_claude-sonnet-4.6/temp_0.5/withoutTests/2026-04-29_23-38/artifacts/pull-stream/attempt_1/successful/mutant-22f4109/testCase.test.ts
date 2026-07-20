import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js"

describe('drain', () => {
  it('should not set doneLackingErr when done callback is provided, and should set it when done callback is not provided', () => {
    // When done is provided, doneLackingErr should NOT be set (original behavior: if (!done))
    // When done is NOT provided, doneLackingErr SHOULD be set (original behavior: if (!done))
    
    // Test: when no done callback is provided, the drain should warn/throw on error
    // This tests that doneLackingErr is properly set when done is absent
    
    const warnMessages: any[] = []
    const originalWarn = console.warn
    console.warn = (...args: any[]) => {
      warnMessages.push(args)
    }
    
    let thrownError: any = null
    
    try {
      // Create a source that emits an error
      const errorSource = (abort: any, cb: Function) => {
        cb(new Error('test error'))
      }
      
      // Create drain WITHOUT a done callback
      const sink = drain(null, null)
      sink(errorSource as any)
    } catch (e) {
      thrownError = e
    }
    
    console.warn = originalWarn
    
    // In the original code: if (!done) { doneLackingErr = new Error(...) }
    // When done is null/undefined, doneLackingErr gets set, and when error occurs,
    // console.warn is called with doneLackingErr, then the error is thrown
    
    // In the mutated code: if (done) { doneLackingErr = new Error(...) }
    // When done is null/undefined, doneLackingErr does NOT get set
    // console.warn would be called with undefined instead of an Error object
    
    // The thrown error should be the 'test error'
    expect(thrownError).not.toBeNull()
    expect(thrownError.message).toBe('test error')
    
    // console.warn should have been called with an Error object (doneLackingErr)
    // In original: doneLackingErr is set when !done, so warn gets an Error
    // In mutated: doneLackingErr is NOT set when !done, so warn gets undefined
    expect(warnMessages.length).toBe(1)
    expect(warnMessages[0][0]).toBeInstanceOf(Error)
    expect(warnMessages[0][0].message).toBe('no done callback supplied')
  })
})