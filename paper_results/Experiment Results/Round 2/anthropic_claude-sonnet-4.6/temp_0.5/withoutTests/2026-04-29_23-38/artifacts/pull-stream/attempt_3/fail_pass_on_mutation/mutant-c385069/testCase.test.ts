import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js"

describe('asyncMap', () => {
  it('calls abort callback when source resolves normal read synchronously during abort handling', () => {
    const abortError = new Error('abort')
    let abortCallbackCalled = false
    let pendingNormalCb: Function | null = null
    
    const source = (abort: any, cb: Function) => {
      if (abort) {
        // When abort comes in, first resolve the pending normal read (making busy=true)
        // then call the abort callback
        if (pendingNormalCb) {
          pendingNormalCb(null, 42) // this sets busy=true, mapper runs
        }
        cb(abort) // now call abort cb - busy=true at this point
      } else {
        pendingNormalCb = cb // store normal read cb
      }
    }
    
    const mapper = (_x: any, _cb: Function) => {
      // Never resolves - keeps busy=true
    }
    
    const mapped = asyncMap(mapper)(source)
    
    // Start a read - source hangs
    mapped(null, () => {})
    
    // Abort while not busy - source will:
    // 1. resolve normal read (busy becomes true)
    // 2. call abort cb (busy=true at this point)
    mapped(abortError, (err: any) => {
      abortCallbackCalled = true
      expect(err).toBe(abortError)
    })
    
    // Original: !busy at abort time -> read(abort, () => cb(abort)) -> source resolves normal (busy=true), then calls innerCb -> innerCb calls cb(abort) unconditionally -> abortCallbackCalled=true
    // Mutated: else branch -> read(abort, (err) => { if(busy) abortCb=cb; else cb(abort) }) -> source resolves normal (busy=true), then calls innerCb -> busy=true -> abortCb=cb -> cb never called -> abortCallbackCalled=false
    
    expect(abortCallbackCalled).toBe(true)
  })
})