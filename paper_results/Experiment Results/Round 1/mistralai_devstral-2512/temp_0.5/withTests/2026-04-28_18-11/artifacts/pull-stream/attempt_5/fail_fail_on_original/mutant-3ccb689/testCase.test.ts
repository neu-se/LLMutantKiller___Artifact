const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const asyncMap = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js");

describe('asyncMap abort behavior', () => {
  it('should handle abort when called multiple times rapidly', (done) => {
    const abortError = new Error('test abort');
    let abortCount = 0;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        abortCount++;
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

    // First read
    read(null, (end: any, data: any) => {
      if (end) {
        done(new Error('Stream ended unexpectedly'));
        return;
      }

      // Rapid abort calls
      read(abortError, (end: any) => {
        if (end !== abortError) {
          done(new Error('First abort should return error'));
          return;
        }

        // Second abort call while first is processing
        read(abortError, (end: any) => {
          if (end !== abortError) {
            done(new Error('Second abort should return error'));
            return;
          }

          if (abortCount !== 2) {
            done(new Error(`Expected 2 abort calls, got ${abortCount}`));
            return;
          }

          done();
        });
      });
    });
  });
});