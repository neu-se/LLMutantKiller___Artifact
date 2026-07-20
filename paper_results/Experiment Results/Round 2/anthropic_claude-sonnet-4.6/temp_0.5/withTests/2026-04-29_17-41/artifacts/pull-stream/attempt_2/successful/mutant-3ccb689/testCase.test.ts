import asyncMap from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js';

describe('asyncMap - aborted early return', () => {
  it('should immediately call back with abort error on subsequent reads after stream has been aborted', (done) => {
    const abortErr = new Error('abort');
    let sourceCallCount = 0;

    // Source that is NOT busy (responds synchronously to abort, async to normal reads)
    const source = (abort: any, cb: Function) => {
      sourceCallCount++;
      if (abort) {
        cb(abort);
      } else {
        // Respond with data synchronously
        cb(null, 42);
      }
    };

    const mapper = asyncMap((data: any, cb: Function) => {
      // Synchronous mapper
      cb(null, data * 2);
    });

    const read = mapper(source);

    // First normal read to consume data (busy becomes false after this)
    read(null, (err: any, data: any) => {
      expect(err).toBeNull();
      expect(data).toBe(84);

      // Now abort - this sets aborted = abortErr
      read(abortErr, (err: any) => {
        expect(err).toBe(abortErr);

        // Record source calls at this point
        const sourceCallsAfterAbort = sourceCallCount;

        // Now call read(null, cb) - aborted is already set
        // Original: if(aborted) return cb(aborted) fires immediately, source NOT called
        // Mutated: if(false) never fires, proceeds to call source again
        read(null, (err: any) => {
          expect(err).toBe(abortErr);

          // In original, source should NOT have been called again
          expect(sourceCallCount).toBe(sourceCallsAfterAbort);

          done();
        });
      });
    });
  });
});