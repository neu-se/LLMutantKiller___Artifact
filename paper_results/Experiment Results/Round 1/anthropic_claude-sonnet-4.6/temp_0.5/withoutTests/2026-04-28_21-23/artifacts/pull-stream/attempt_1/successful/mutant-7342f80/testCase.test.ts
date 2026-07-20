import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js"

describe('drain without done callback', () => {
  it('should warn and throw when stream ends with error and no done callback is provided', () => {
    // Create a source that emits an error
    const testError = new Error('test stream error')
    let callCount = 0
    
    const source = (_abort: any, cb: Function) => {
      callCount++
      if (callCount === 1) {
        cb(testError, null) // emit error
      }
    }

    // Capture console.warn calls
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

    // Create drain without done callback - should throw when error occurs
    const sink = drain(null) // no done callback

    // The drain should throw when it receives an error without a done callback
    expect(() => {
      sink(source)
    }).toThrow(testError)

    // In the original code, doneLackingErr is initialized because !done is true
    // So console.warn should be called with the Error object
    // In mutated code (if false), doneLackingErr is never set (undefined)
    // console.warn would be called with undefined
    expect(warnSpy).toHaveBeenCalledWith(expect.any(Error))

    warnSpy.mockRestore()
  })
})