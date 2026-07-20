import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js"

describe('asyncMap', () => {
  it('abort callback fires unconditionally in not-busy branch', () => {
    const abortError = new Error('abort')
    const log: string[] = []
    let normalCb: Function | null = null
    let abortSourceCb: Function | null = null

    const source = (abort: any, cb: Function) => {
      if (abort) abortSourceCb = cb
      else normalCb = cb
    }

    const neverResolvingMapper = (_d: any, _cb: Function) => {}

    const stream = asyncMap(neverResolvingMapper)(source)

    stream(null, () => { log.push('data') })
    stream(abortError, () => { log.push('aborted') })

    // busy=false when abort called, now make busy=true
    normalCb!(null, 42)
    // fire abort source callback with busy=true
    abortSourceCb!(abortError)

    // Original: 'aborted' should be in log
    // Mutated: 'aborted' should NOT be in log (abortCb stored but never called)
    expect(log).toContain('aborted')
  })
})