const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const asyncMap = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js");

describe("asyncMap abort behavior", () => {
  it("should immediately callback with abort error when aborted and not busy", (done) => {
    const abortError = new Error("test abort");
    let abortCalled = false;

    // Create a simple source that provides values
    const source = (abort: any, cb: any) => {
      if (abort) {
        cb(abort);
      } else {
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

      // Now abort immediately
      read(abortError, (endErr: any) => {
        abortCalled = true;
        if (endErr !== abortError) {
          done(new Error(`Expected abort error to be propagated, got ${endErr}`));
          return;
        }

        // Verify the source was properly aborted
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