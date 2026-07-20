const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const asyncMap = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js");

describe('asyncMap abort behavior', () => {
  it('should immediately callback with abort error when aborted before first read', (done) => {
    const abortError = new Error('test abort');
    let readCalled = false;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      readCalled = true;
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

    // Abort immediately without any read first
    read(abortError, (end: any) => {
      if (end !== abortError) {
        done(new Error('Expected abort error to be returned'));
        return;
      }

      if (!readCalled) {
        done(new Error('Source should have been called with abort'));
        return;
      }

      done();
    });
  });
});