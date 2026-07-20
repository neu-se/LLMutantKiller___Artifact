import through from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe("through onEnd receives correct abort error", () => {
  it("should pass the actual error to onEnd when aborted with a non-true error object", (done) => {
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

    // Source that yields one value then hangs waiting for abort
    let pending: Function | null = null;
    const source = function(end: any, cb: Function) {
      if (end) {
        if (pending) {
          const p = pending;
          pending = null;
          p(end);
        }
        cb(end);
        return;
      }
      // hang after first call
      pending = cb;
    };

    const readable = throughStream(source);

    // Abort with a specific error (not `true`)
    readable(specificError, function(end: any, data: any) {
      expect(onEndCalled).toBe(true);
      // Original: onEnd receives specificError (not null)
      // Mutated: onEnd always receives null
      expect(receivedError).toBe(specificError);
      done();
    });
  });
});