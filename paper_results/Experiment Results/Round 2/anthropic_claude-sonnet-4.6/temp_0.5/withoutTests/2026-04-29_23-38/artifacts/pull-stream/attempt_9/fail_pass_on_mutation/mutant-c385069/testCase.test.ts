import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js"

describe('asyncMap', () => {
  it('calls abort callback when aborting idle stream that receives data before abort resolves', (done) => {
    const abortError = new Error('abort')
    const sourceCalls: Array<{abort: any, cb: Function}> = []

    const source = (abort: any, cb: Function) => {
      sourceCalls.push({abort, cb})
    }

    let mapperCbRef: Function | null = null
    const mapper = (_data: any, cb: Function) => {
      mapperCbRef = cb
      // async - call back on next tick
      process.nextTick(() => {
        if (mapperCbRef === cb) cb(null, _data)
      })
    }

    const stream = asyncMap(mapper)(source)

    stream(null, () => {})
    stream(abortError, (err: any) => {
      expect(err).toBe(abortError)
      done()
    })

    // Deliver data synchronously -> busy=true, mapper starts async
    sourceCalls[0].cb(null, 'hello')
    
    // Fire abort callback - busy=true (mapper hasn't completed yet)
    sourceCalls[1].cb(abortError)
    
    // Original: cb(abort) called -> done() immediately
    // Mutated: abortCb=cb stored -> done() never called (aborted never set) -> timeout
  }, 500)
})