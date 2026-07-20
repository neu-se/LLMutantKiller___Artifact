import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js"

describe('drain without done callback error message', () => {
  it('should throw an error with the message "no done callback supplied" when an error occurs and no done callback is provided', () => {
    // Create a source that emits an error
    const testError = new Error('test stream error')
    
    let thrownError: Error | null = null
    
    // Mock console.warn to capture the warning
    const originalWarn = console.warn
    let warnedMessage: any = null
    console.warn = (msg: any) => {
      warnedMessage = msg
    }
    
    try {
      // Create a drain without a done callback
      const sink = drain(null, null)
      
      // Create a read function that immediately returns an error
      const read = (_: any, cb: (end: any, data: any) => void) => {
        cb(testError, null)
      }
      
      // Connect the sink to the read function - this should throw
      sink(read)
    } catch (e) {
      thrownError = e as Error
    } finally {
      console.warn = originalWarn
    }
    
    // The error should have been thrown
    expect(thrownError).toBe(testError)
    
    // The warned message should be the doneLackingErr error
    expect(warnedMessage).toBeInstanceOf(Error)
    
    // This is the key assertion - the error message should be 'no done callback supplied'
    // The mutation changes this to an empty string ''
    expect(warnedMessage.message).toBe('no done callback supplied')
  })
})