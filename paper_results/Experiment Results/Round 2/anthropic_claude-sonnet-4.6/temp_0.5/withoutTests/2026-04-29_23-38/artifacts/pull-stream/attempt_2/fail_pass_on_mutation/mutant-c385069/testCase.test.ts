import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js"

describe('asyncMap abort while source is async', () => {
  it('should call abort callback even when source delays response and stream is not busy', (done) => {
    const abortError = new Error('abort')
    let sourceCb: Function | null = null
    
    // Async source that holds the callback
    const source = (abort: any, cb: Function) => {
      if (abort) {
        sourceCb = cb
        return
      }
      // hang on normal read
    }
    
    const mapped = asyncMap((x: any, cb: Function) => cb(null, x))(source)
    
    // Abort when not busy - source will hold the abort callback
    mapped(abortError, (err: any) => {
      expect(err).toBe(abortError)
      done()
    })
    
    // Now resolve the source's abort callback
    // In original: sourceCb is from the !busy branch, cb(abort) called unconditionally
    // In mutated: sourceCb is from else branch, checks busy at callback time
    if (sourceCb) {
      (sourceCb as Function)(abortError)
    }
  })
})