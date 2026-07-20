import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js"

describe('asyncMap', () => {
  it('abort callback fires when not busy at abort time with async mapper', (done) => {
    const abortError = new Error('abort')
    let normalCb: Function | null = null
    let abortSourceCb: Function | null = null

    const source = (abort: any, cb: Function) => {
      if (abort) abortSourceCb = cb
      else normalCb = cb
    }

    // Async mapper - keeps busy=true until setImmediate fires
    const mapper = (_d: any, cb: Function) => {
      setImmediate(() => cb(null, _d))
    }

    const stream = asyncMap(mapper)(source)

    stream(null, () => {})
    stream(abortError, (err: any) => {
      expect(err).toBe(abortError)
      done()
    })

    normalCb!(null, 42)  // busy=true, mapper async
    abortSourceCb!(abortError)  // busy=true -> mutated: abortCb=cb2, never called
    // original: cb2(abortError) called unconditionally -> done()
  }, 500)
})