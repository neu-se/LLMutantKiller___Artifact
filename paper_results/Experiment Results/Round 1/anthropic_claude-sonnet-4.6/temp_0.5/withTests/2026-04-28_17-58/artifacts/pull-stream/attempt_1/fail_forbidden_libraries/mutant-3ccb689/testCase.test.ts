import { describe, it, expect } from '@jest/globals'
import asyncMap from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js'

describe('asyncMap abort behavior', () => {
  it('should immediately return aborted error on subsequent reads after abort when not busy', (done) => {
    const abortErr = new Error('abort')
    
    // Create a simple synchronous source
    let sourceCallCount = 0
    const source = (abort: any, cb: Function) => {
      sourceCallCount++
      if (abort) {
        cb(abort)
        return
      }
      cb(null, sourceCallCount)
    }
    
    const mapper = asyncMap((data: any, cb: Function) => {
      cb(null, data * 2)
    })
    
    const read = mapper(source)
    
    // First read to get a value (not busy after this)
    read(null, (err: any, data: any) => {
      expect(err).toBeNull()
      expect(data).toBe(2)
      
      // Now abort the stream
      read(abortErr, (err: any) => {
        expect(err).toBe(abortErr)
        
        const sourceCallsAfterAbort = sourceCallCount
        
        // Now try to read again - should immediately get aborted error
        // In original: if(aborted) return cb(aborted) fires immediately
        // In mutated: if(false) return cb(aborted) is skipped, source gets called again
        read(null, (err: any) => {
          expect(err).toBe(abortErr)
          // In original code, source should NOT be called again since aborted check fires first
          // In mutated code, source WILL be called again
          expect(sourceCallCount).toBe(sourceCallsAfterAbort)
          done()
        })
      })
    })
  })
})