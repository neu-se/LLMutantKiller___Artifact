import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js"

describe('drain sink error handling without done callback', () => {
  it('should throw when stream ends with an error and no done callback is provided', () => {
    const error = new Error('stream error')
    
    // Create a source that immediately ends with an error
    const source = (end: any, cb: (end: any, data?: any) => void) => {
      cb(error)
    }
    
    const sink = drain(null)
    
    expect(() => {
      sink(source)
    }).toThrow(error)
  })
})