import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe('asyncMap - aborted flag check at start of next()', () => {
  it('should immediately call back with abort error on reads after stream has been aborted and was not busy', (done) => {
    const abortErr = new Error('abort')
    let sourceCallCount = 0

    // Synchronous source
    const source = (abort: any, cb: Function) => {
      sourceCallCount++
      if (abort) {
        cb(abort)
      } else {
        cb(null, 42)
      }
    }

    const read = asyncMap((data: any, cb: Function) => {
      cb(null, data)
    })(source)

    // First read - completes synchronously, stream is not busy after
    read(null, (err: any, data: any) => {
      expect(err).toBeNull()
      expect(data).toBe(42)

      const countBeforeAbort = sourceCallCount

      // Abort the stream while not busy
      read(abortErr, (err: any) => {
        expect(err).toBe(abortErr)

        const countAfterAbort = sourceCallCount

        // Read again after abort - original immediately returns cb(aborted) without calling source
        // Mutated skips the check and calls source again
        read(null, (err: any) => {
          expect(err).toBe(abortErr)
          // In original: source not called again (aborted guard fires first)
          // In mutated: source gets called again
          expect(sourceCallCount).toBe(countAfterAbort)
          done()
        })
      })
    })
  })
})