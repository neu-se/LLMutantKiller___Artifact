import { describe, it, expect } from '@jest/globals';
import asyncMap from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js';

describe('asyncMap aborted early return', () => {
  it('should immediately return the abort error on subsequent reads after abort has been set', (done) => {
    const abortErr = new Error('abort');
    const results: any[] = [];
    
    // Create a simple source that tracks calls
    let sourceCallCount = 0;
    const source = (abort: any, cb: Function) => {
      sourceCallCount++;
      if (abort) {
        cb(abort);
        return;
      }
      // Simulate async data
      setImmediate(() => {
        cb(null, sourceCallCount);
      });
    };

    const mapper = asyncMap((data: any, cb: Function) => {
      setImmediate(() => cb(null, data));
    });

    const read = mapper(source);

    // First, do a normal read to get things going
    read(null, (err: any, data: any) => {
      if (err) {
        done(new Error('unexpected error on first read: ' + err));
        return;
      }
      results.push(data);

      // Now abort the stream
      read(abortErr, (err: any) => {
        expect(err).toBe(abortErr);
        
        // Record source calls after abort
        const sourceCallsAfterAbort = sourceCallCount;

        // Now try to read again with null (not abort) - 
        // In original: aborted is set, so it returns cb(aborted) immediately without calling source
        // In mutated: aborted check is `if(false)`, so it proceeds to call read(null, ...) on source
        read(null, (err: any, data: any) => {
          expect(err).toBe(abortErr);
          
          // In original code, source should NOT have been called again because
          // the early return `if(aborted) return cb(aborted)` fires before reaching read()
          // In mutated code, source WOULD be called again (sourceCallCount would increase)
          expect(sourceCallCount).toBe(sourceCallsAfterAbort);
          
          done();
        });
      });
    });
  });
});