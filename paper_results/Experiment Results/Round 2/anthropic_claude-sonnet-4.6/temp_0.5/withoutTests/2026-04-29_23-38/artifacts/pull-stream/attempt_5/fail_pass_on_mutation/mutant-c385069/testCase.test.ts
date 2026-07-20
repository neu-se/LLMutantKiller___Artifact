import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js"

describe('asyncMap', () => {
  it('detects mutation: abort callback must fire when not busy at abort time', (done) => {
    jest.setTimeout(1000)
    
    const abortError = new Error('abort')
    let normalReadCb: Function | null = null
    let abortReadCb: Function | null = null
    let readCallCount = 0
    
    const source = (abort: any, cb: Function) => {
      readCallCount++
      if (abort) {
        abortReadCb = cb
      } else {
        normalReadCb = cb
      }
    }
    
    const mapper = (_data: any, _cb: Function) => {
      // Never resolves - busy stays true
    }
    
    const stream = asyncMap(mapper)(source)
    
    // Step 1: normal read - source hangs, busy=false
    stream(null, () => {})
    expect(normalReadCb).not.toBeNull()
    expect(readCallCount).toBe(1)
    
    // Step 2: abort while not busy
    stream(abortError, (err: any) => {
      expect(err).toBe(abortError)
      done()
    })
    expect(abortReadCb).not.toBeNull()
    expect(readCallCount).toBe(2)
    
    // Step 3: source delivers data for normal read -> busy=true, mapper starts
    normalReadCb!(null, 42)
    
    // Step 4: source responds to abort - busy=true now
    // Original: cb(abort) called unconditionally -> done() called
    // Mutated: if(busy) abortCb=cb -> done() never called -> test times out
    abortReadCb!(abortError)
  })
})