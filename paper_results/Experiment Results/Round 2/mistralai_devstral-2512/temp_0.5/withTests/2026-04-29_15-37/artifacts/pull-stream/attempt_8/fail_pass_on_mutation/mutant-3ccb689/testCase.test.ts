const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const asyncMap = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js");

describe("asyncMap abort behavior", () => {
  it("should immediately callback with abort error when aborted and not busy", (done) => {
    const abortError = new Error("test abort");
    let abortCalled = false;
    let secondReadAttempted = false;

    // Create a source that tracks read attempts
    const source = (abort: any, cb: any) => {
      if (abort) {
        cb(abort);
      } else {
        if (secondReadAttempted) {
          // This should not happen in the original code when aborted
          done(new Error("Source was read from after abort"));
          return;
        }
        cb(null, 1);
      }
    };

    const read = pull(
      source,
      asyncMap((data: any, cb: any) => {
        setImmediate(() => cb(null, data));
      })
    );

    // First read to get things started
    read(null, (end: any, data: any) => {
      if (end) {
        done(new Error("Stream ended unexpectedly"));
        return;
      }
      if (data !== 1) {
        done(new Error(`Expected first data to be 1, got ${data}`));
        return;
      }

      // Mark that we're attempting a second read after abort
      secondReadAttempted = true;

      // Now abort immediately
      read(abortError, (endErr: any) => {
        abortCalled = true;
        if (endErr !== abortError) {
          done(new Error(`Expected abort error to be propagated, got ${endErr}`));
          return;
        }

        // In the original code, the abort should prevent further reads
        // The test passes if we get here without the source being read again
        setImmediate(() => {
          if (!abortCalled) {
            done(new Error("Abort callback was not called"));
          } else {
            done();
          }
        });
      });
    });
  });
});