const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");

describe("drain abort with function as error", () => {
  it("should treat function as callback when passed to abort", (done) => {
    let callbackInvoked = false;
    let errorCallbackInvoked = false;

    const sink = drain(null, (err: any) => {
      errorCallbackInvoked = true;
      expect(err).toBe(true);
      done();
    });

    // Call sink.abort with a function as the first argument
    // In original code: function is treated as callback (cb = err, err = true)
    // In mutated code: function is not treated as callback (condition fails)
    sink.abort(function (err: any) {
      callbackInvoked = true;
      expect(err).toBe(true);
    });

    // Trigger the abort
    sink((abort: any, cb: any) => {
      cb(abort || true);
    });

    // Verify the function was treated as callback (original behavior)
    setTimeout(() => {
      expect(callbackInvoked).toBe(true);
      done();
    }, 50);
  });
});