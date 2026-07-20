const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const asyncMap = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js");

describe('asyncMap abort behavior', () => {
  it('should immediately callback with abort when aborted while not busy', (done) => {
    const abortError = new Error('test abort');
    let abortCallbackCount = 0;
    let readCallbackCount = 0;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
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
      readCallbackCount++;
      if (end) {
        done(new Error('Stream ended unexpectedly'));
        return;
      }

      // Abort when not busy (after first read completes)
      setImmediate(() => {
        read(abortError, (end: any) => {
          abortCallbackCount++;
          if (end !== abortError) {
            done(new Error('Expected abort error to be returned'));
            return;
          }

          // The mutation changes `if(aborted) return cb(aborted)` to `if(false) return cb(aborted)`
          // This means the abort callback won't be called immediately when aborted while not busy
          // Instead it will proceed to call read(abort, ...) which will call cb(abort) later
          // This creates a timing difference we can detect
          if (abortCallbackCount !== 1) {
            done(new Error('Abort callback should be called exactly once'));
            return;
          }

          // Verify the abort happened before any new reads
          if (readCallbackCount !== 1) {
            done(new Error('Should not have made additional reads after abort'));
            return;
          }

          done();
        });
      });
    });
  });
});