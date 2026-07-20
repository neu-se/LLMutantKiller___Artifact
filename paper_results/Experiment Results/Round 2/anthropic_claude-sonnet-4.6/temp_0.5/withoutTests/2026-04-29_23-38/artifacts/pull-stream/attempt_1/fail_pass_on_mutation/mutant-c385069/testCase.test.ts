import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js"

describe('asyncMap abort behavior when not busy', () => {
  it('should call the callback when aborting a non-busy stream', (done) => {
    const error = new Error('abort')
    
    // Create a source that never ends (hangs)
    const source = (abort: any, cb: Function) => {
      if (abort) {
        cb(abort)
        return
      }
      // Never call cb - simulates a hanging source
    }
    
    const through = asyncMap((data: any, cb: Function) => {
      cb(null, data)
    })
    
    const stream = through(source)
    
    // Abort immediately (not busy since we never started reading)
    stream(error, (err: any) => {
      expect(err).toBe(error)
      done()
    })
  })
})