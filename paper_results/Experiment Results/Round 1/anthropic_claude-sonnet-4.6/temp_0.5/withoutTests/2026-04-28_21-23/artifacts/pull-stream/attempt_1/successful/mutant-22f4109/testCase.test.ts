import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js"

describe("drain sink behavior when done callback is not provided", () => {
  it("should not set doneLackingErr when done callback is provided, and should set it when done is not provided", () => {
    // When done IS provided, doneLackingErr should NOT be set (original: if (!done) sets it only when no done)
    // When done is NOT provided, doneLackingErr SHOULD be set (original behavior)
    // The mutation changes `if (!done)` to `if (done)`, which inverts this logic
    
    // Test: when no done callback is provided, the drain should warn/throw with doneLackingErr
    // when an error occurs. With the mutation, doneLackingErr won't be set when done is absent,
    // so the throw would happen without the captured stack trace error.
    
    // More specifically: with the original code, if done is NOT provided and an error occurs,
    // it should console.warn(doneLackingErr) and throw end.
    // doneLackingErr is set when !done is true (i.e., no done callback).
    
    // With the mutation (if done), doneLackingErr is set when done IS provided,
    // meaning when no done is provided, doneLackingErr remains undefined.
    
    // We can observe this by checking what gets thrown when an error stream is consumed
    // without a done callback.
    
    const originalWarn = console.warn
    const warnCalls: any[] = []
    console.warn = (...args: any[]) => {
      warnCalls.push(args)
    }
    
    try {
      // Create a read source that immediately returns an error
      const testError = new Error("test stream error")
      const errorSource = (_abort: any, cb: Function) => {
        cb(testError)
      }
      
      // Create drain WITHOUT a done callback - this is the key scenario
      // Original: if (!done) { doneLackingErr = new Error(...) } -- sets doneLackingErr
      // Mutated: if (done) { doneLackingErr = new Error(...) } -- does NOT set doneLackingErr (done is undefined)
      const sink = drain(null)  // no done callback
      
      // When the error is thrown, console.warn should be called with doneLackingErr
      // Original: doneLackingErr is an Error object (set because !done was true)
      // Mutated: doneLackingErr is undefined (not set because done was falsy, condition was if(done))
      
      let thrownError: any = null
      try {
        sink(errorSource)
      } catch (e) {
        thrownError = e
      }
      
      // The error should have been thrown
      expect(thrownError).toBe(testError)
      
      // console.warn should have been called once
      expect(warnCalls.length).toBe(1)
      
      // In original code: doneLackingErr is an Error instance (set when !done)
      // In mutated code: doneLackingErr is undefined (not set when !done, only set when done)
      const warnedValue = warnCalls[0][0]
      
      // Original: warnedValue should be an Error instance
      // Mutated: warnedValue should be undefined
      expect(warnedValue).toBeInstanceOf(Error)
      expect(warnedValue.message).toBe("no done callback supplied")
    } finally {
      console.warn = originalWarn
    }
  })
})