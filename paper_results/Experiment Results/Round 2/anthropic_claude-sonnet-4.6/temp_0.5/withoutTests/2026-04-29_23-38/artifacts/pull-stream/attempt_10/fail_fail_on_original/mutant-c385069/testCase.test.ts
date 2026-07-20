import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js"

describe('asyncMap', () => {
  it('mutation detection', () => {
    const abortError = new Error('abort')
    let abortCbCalled = false
    const sourceCalls: Array<{abort: any, cb: Function}> = []
    let mapperCallCount = 0
    let mapperCbArg: Function | undefined

    const source = (abort: any, cb: Function) => {
      sourceCalls.push({ abort, cb })
    }

    const mapper = function(data: any, cb: Function) {
      mapperCallCount++
      mapperCbArg = cb
      // Never call cb
    }

    const stream = asyncMap(mapper)(source)

    stream(null, () => {})
    stream(abortError, () => { abortCbCalled = true })

    // Verify source was called twice
    expect(sourceCalls.length).toBe(2)

    // Deliver data - should set busy=true and call mapper
    sourceCalls[0].cb(null, 'test')

    // Verify mapper was called with a real callback
    expect(mapperCallCount).toBe(1)
    expect(typeof mapperCbArg).toBe('function')

    // Fire abort source callback - busy should be true
    sourceCalls[1].cb(abortError)

    // Original: cb(abort) called unconditionally -> true
    // Mutated: if(busy) abortCb=cb -> false (cb never called)
    expect(abortCbCalled).toBe(true)
  })
})