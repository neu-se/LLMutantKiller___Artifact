import { through } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe("through onEnd receives correct abort error", () => {
  it("should pass the actual error to onEnd when aborted with a non-true error", (done) => {
    const specificError = new Error("specific abort error");
    let receivedError: any = undefined;
    let onEndCalled = false;

    const throughStream = through(
      undefined,
      function(err: any) {
        onEndCalled = true;
        receivedError = err;
      }
    );

    // Create a simple source that yields one value then hangs
    let readCalled = 0;
    const source = function(end: any, cb: Function) {
      if (end) {
        cb(end);
        return;
      }
      readCalled++;
      if (readCalled === 1) {
        cb(null, "data");
      } else {
        // hang - don't call cb
      }
    };

    const readable = throughStream(source);

    // First read to get data
    readable(null, function(end: any, data: any) {
      // Now abort with a specific error
      readable(specificError, function(end: any, data: any) {
        // After abort completes, check that onEnd received the specific error
        expect(onEndCalled).toBe(true);
        expect(receivedError).toBe(specificError);
        done();
      });
    });
  });
});