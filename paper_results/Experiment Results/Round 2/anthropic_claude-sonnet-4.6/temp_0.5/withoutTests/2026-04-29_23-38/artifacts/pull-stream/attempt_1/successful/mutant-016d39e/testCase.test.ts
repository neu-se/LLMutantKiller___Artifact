import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js"

describe('drain without done callback error message', () => {
  it('should throw an error with message "no done callback supplied" when stream errors and no done callback is provided', () => {
    const error = new Error('stream error')
    
    // Create a read function that immediately returns an error
    const read = (_abort: any, cb: (end: any, data?: any) => void) => {
      cb(error)
    }
    
    // Create drain without a done callback
    const sink = drain(null, null)
    
    // Capture the thrown error
    let thrownError: Error | null = null
    const originalWarn = console.warn
    const warnMessages: any[] = []
    console.warn = (...args: any[]) => {
      warnMessages.push(args)
    }
    
    try {
      sink(read)
    } catch (e) {
      thrownError = e as Error
    } finally {
      console.warn = originalWarn
    }
    
    // The error should have been thrown
    expect(thrownError).toBe(error)
    
    // The console.warn should have been called with the doneLackingErr
    expect(warnMessages.length).toBe(1)
    const warnedError = warnMessages[0][0]
    expect(warnedError).toBeInstanceOf(Error)
    
    // This is the key assertion that distinguishes original from mutated code
    // Original: 'no done callback supplied'
    // Mutated: ''
    expect(warnedError.message).toBe('no done callback supplied')
  })
})