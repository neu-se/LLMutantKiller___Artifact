import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js"

describe('asyncMap', () => {
  it('calls abort callback when not busy at abort time', (done) => {
    const abortError = new Error('abort')
    let normalCb: Function | null = null

    const source = (abort: any, cb: Function) => {
      if (abort) {
        // Respond to abort asynchronously, after normalCb has been resolved
        setImmediate(() => cb(abort))
      } else {
        normalCb = cb
      }
    }

    const neverResolvingMapper = (_d: any, _cb: Function) => {}

    const stream = asyncMap(neverResolvingMapper)(source)

    stream(null, () => {})
    
    stream(abortError, (err: any) => {
      expect(err).toBe(abortError)
      done()
    })

    // Make busy=true synchronously before setImmediate fires
    normalCb!(null, 42)
    
    // Now setImmediate fires: busy=true
    // Original: cb(abort) unconditionally -> done() called
    // Mutated: if(busy) abortCb=cb -> done() never called -> timeout
  }, 500)
})