const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const asyncMap = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js");

describe('asyncMap abort behavior', () => {
  it('should immediately return abort error when aborted while not busy', (done) => {
    const abortError = new Error('test abort');
    let callbackCount = 0;

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
      if (end) {
        done(new Error('Stream ended unexpectedly'));
        return;
      }

      // Abort when not busy (after first read completes)
      setImmediate(() => {
        read(abortError, (end: any) => {
          callbackCount++;
          if (end !== abortError) {
            done(new Error('Expected abort error to be returned immediately'));
            return;
          }

          // The mutation would cause this to not be called immediately
          // because it changes the condition from `if(aborted)` to `if(false)`
          if (callbackCount !== 1) {
            done(new Error('Callback should only be called once'));
            return;
          }

          done();
        });
      });
    });
  });
});