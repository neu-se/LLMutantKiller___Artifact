import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('asyncMap abort behavior', () => {
  it('should immediately callback with abort error when aborted and not busy', (done) => {
    const abortError = new Error('test abort');
    let abortCalled = false;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        abortCalled = true;
        cb(abort);
      } else {
        cb(null, 1);
      }
    };

    const asyncMap = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js");

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

      // Now abort immediately
      read(abortError, (end: any) => {
        if (end !== abortError) {
          done(new Error('Expected abort error to be returned'));
          return;
        }

        if (!abortCalled) {
          done(new Error('Source abort was not called'));
          return;
        }

        done();
      });
    });
  });
});