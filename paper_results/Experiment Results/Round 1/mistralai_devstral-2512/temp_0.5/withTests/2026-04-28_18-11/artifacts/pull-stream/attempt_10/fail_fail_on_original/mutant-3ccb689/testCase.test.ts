const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const asyncMap = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js");

describe('asyncMap abort behavior', () => {
  it('should immediately return abort error when aborted while not busy', (done) => {
    const abortError = new Error('test abort');
    let callbackOrder: string[] = [];

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        callbackOrder.push('source-abort');
        setTimeout(() => {
          callbackOrder.push('source-callback');
          cb(abort);
        }, 10);
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
        callbackOrder.push('abort-callback');
        if (end !== abortError) {
          done(new Error('Expected abort error to be returned'));
          return;
        }

        // The mutation changes `if(aborted) return cb(aborted)` to `if(false) return cb(aborted)`
        // In original code, abort-callback should be called immediately (before source-callback)
        // In mutated code, abort-callback will wait for source-callback
        setTimeout(() => {
          const abortIdx = callbackOrder.indexOf('abort-callback');
          const sourceCallbackIdx = callbackOrder.indexOf('source-callback');

          if (abortIdx === -1 || sourceCallbackIdx === -1) {
            done(new Error('Expected both callbacks to be called'));
            return;
          }

          if (abortIdx > sourceCallbackIdx) {
            done(new Error('Abort callback should be called before source callback in original code'));
            return;
          }

          done();
        }, 20);
      });
    });
  });
});