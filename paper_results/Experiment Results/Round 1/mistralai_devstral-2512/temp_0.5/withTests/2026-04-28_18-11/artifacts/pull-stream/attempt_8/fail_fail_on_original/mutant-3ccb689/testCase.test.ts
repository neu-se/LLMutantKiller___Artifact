const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const asyncMap = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js");

describe('asyncMap abort behavior', () => {
  it('should immediately return abort error when aborted while not busy', (done) => {
    const abortError = new Error('test abort');
    let callbackTiming: number[] = [];

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        setTimeout(() => cb(abort), 10);
      } else {
        cb(null, 1);
      }
    };

    const read = pull(
      source,
      asyncMap((data: any, cb: (err: any, result?: any) => void) => {
        setImmediate(() => cb(null, data));
      })
    );

    // First read to establish the stream
    read(null, (end: any, data: any) => {
      if (end) {
        done(new Error('Stream ended unexpectedly'));
        return;
      }

      // Abort when not busy (after first read completes)
      const startTime = Date.now();
      read(abortError, (end: any) => {
        const elapsed = Date.now() - startTime;
        callbackTiming.push(elapsed);

        if (end !== abortError) {
          done(new Error('Expected abort error to be returned'));
          return;
        }

        // The mutation changes `if(aborted) return cb(aborted)` to `if(false) return cb(aborted)`
        // This means the abort callback won't be called immediately when aborted while not busy
        // Instead it will wait for the source to callback (10ms delay)
        // So we can detect the mutation by checking the timing
        if (elapsed > 5) {
          done(new Error('Abort callback should be immediate (<5ms) when not busy'));
          return;
        }

        done();
      });
    });
  });
});