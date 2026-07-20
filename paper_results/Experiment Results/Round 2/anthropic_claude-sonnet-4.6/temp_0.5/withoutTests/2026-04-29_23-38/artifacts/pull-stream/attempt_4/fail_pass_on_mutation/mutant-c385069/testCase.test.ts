import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js"

describe('asyncMap', () => {
  it('should call abort callback when not busy at abort time even if mapper becomes busy synchronously', () => {
    const abortError = new Error('abort')
    const results: string[] = []
    let storedNormalCb: ((end: any, data?: any) => void) | null = null

    // Source that when aborted, first delivers data to make mapper busy, then responds to abort
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        // First, deliver data via the pending normal read callback -> makes busy=true
        if (storedNormalCb) {
          storedNormalCb(null, 1)
          storedNormalCb = null
        }
        // Then call the abort callback - at this point busy=true
        cb(abort)
      } else {
        storedNormalCb = cb
      }
    }

    // Mapper that never completes (keeps busy=true)
    const mapper = (_data: any, _cb: Function) => {
      // intentionally never calls _cb
    }

    const stream = asyncMap(mapper)(source)

    // Initiate a read - source hangs, busy=false
    stream(null, () => { results.push('data') })

    // Abort while not busy
    stream(abortError, (err: any) => {
      results.push('aborted')
    })

    // In original: abort callback fires -> results=['aborted']
    // In mutated: abort callback never fires -> results=[]
    expect(results).toContain('aborted')
  })
})