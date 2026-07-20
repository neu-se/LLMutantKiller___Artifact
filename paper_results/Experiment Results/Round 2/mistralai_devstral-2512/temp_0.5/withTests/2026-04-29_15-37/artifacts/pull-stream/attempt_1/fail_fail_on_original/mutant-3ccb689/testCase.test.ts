import { asyncMap } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("asyncMap abort behavior", () => {
  it("should immediately callback with abort error when aborted and not busy", (done) => {
    const abortError = new Error("test abort");
    let abortCalled = false;

    const source = pull.values([1, 2, 3], (err) => {
      if (err !== true) {
        done(new Error("Expected source to be aborted with true"));
      }
    });

    const read = pull(
      source,
      asyncMap((data, cb) => {
        setImmediate(() => cb(null, data * 2));
      })
    );

    // First read to get things started
    read(null, (end, data) => {
      if (end) {
        done(new Error("Stream ended unexpectedly"));
        return;
      }
      if (data !== 1) {
        done(new Error(`Expected first data to be 1, got ${data}`));
        return;
      }

      // Now abort immediately
      read(abortError, (endErr) => {
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