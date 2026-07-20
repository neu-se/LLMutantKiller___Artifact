import { through } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe("through onEnd callback receives correct abort value", () => {
  it("should pass the actual error to onEnd when aborted with a non-true error", (done) => {
    const actualError = new Error("test abort error");
    let receivedError: any = undefined;
    let onEndCalled = false;

    const throughStream = through(null, function(err: any) {
      onEndCalled = true;
      receivedError = err;
    });

    // Create a source that will end with an actual error
    const source = function(end: any, cb: Function) {
      if (end) {
        cb(end);
      } else {
        cb(actualError, null);
      }
    };

    const readable = throughStream(source);

    // Read once - this will trigger the source to return actualError
    readable(null, function(end: any, data: any) {
      // end should be actualError here, which triggers once(end)
      // After this, onEnd should have been called with actualError (original)
      // or null (mutated)
      
      // Give it a tick to settle
      setTimeout(() => {
        expect(onEndCalled).toBe(true);
        expect(receivedError).toBe(actualError);
        done();
      }, 0);
    });
  });
});