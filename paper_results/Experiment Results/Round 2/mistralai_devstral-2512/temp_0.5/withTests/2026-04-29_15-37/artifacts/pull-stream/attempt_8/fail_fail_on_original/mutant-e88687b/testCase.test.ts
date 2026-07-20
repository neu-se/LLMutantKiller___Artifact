const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");

describe("drain abort with function as error", () => {
  it("should handle function as error parameter correctly", (done) => {
    let doneCalled = false;
    const sink = drain(null, (err: any) => {
      doneCalled = true;
      expect(err).toBe(true);
      done();
    });

    // Call sink.abort with a function as the first argument
    // In the original code, this should treat the function as a callback
    // In the mutated code, this will incorrectly treat it as an error
    sink.abort(function (err: any) {
      // This callback should be invoked with true in original code
      expect(err).toBe(true);
    });

    // Trigger the abort by calling the sink with a read function
    // that immediately returns an abort signal
    sink((abort: any, cb: any) => {
      cb(abort || true);
    });

    // Fail test if done isn't called within 100ms
    setTimeout(() => {
      if (!doneCalled) {
        done(new Error("Test timed out - done callback not called"));
      }
    }, 100);
  });
});