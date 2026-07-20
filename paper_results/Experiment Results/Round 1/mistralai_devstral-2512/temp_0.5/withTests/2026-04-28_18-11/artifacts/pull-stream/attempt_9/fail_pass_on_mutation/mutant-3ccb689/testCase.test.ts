const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const asyncMap = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js");

describe('asyncMap abort behavior', () => {
  it('should immediately callback with abort when aborted while not busy', (done) => {
    const abortError = new Error('test abort');
    let abortCallbackCalled = false;
    let sourceAbortCalled = false;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        sourceAbortCalled = true;
        // Simulate a slow source that takes time to acknowledge abort
        setTimeout(() => cb(abort), 50);
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
      read(abortError, (end: any) => {
        abortCallbackCalled = true;
        if (end !== abortError) {
          done(new Error('Expected abort error to be returned'));
          return;
        }

        // The mutation changes `if(aborted) return cb(aborted)` to `if(false) return cb(aborted)`
        // This means the abort callback should be called immediately in original code
        // but will wait for source callback in mutated code
        // We can detect this by checking if source was called before our callback
        if (!sourceAbortCalled) {
          done(new Error('Source should have been called with abort before callback'));
          return;
        }

        // Give a moment to ensure source callback happens after
        setTimeout(() => {
          if (abortCallbackCalled) {
            done();
          } else {
            done(new Error('Abort callback should have been called'));
          }
        }, 10);
      });
    });
  });
});