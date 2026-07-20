const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");

describe("drain abort with function as error", () => {
  it("should handle function as error parameter correctly", (done) => {
    const sink = drain(null, (err: any) => {
      expect(err).toBe(true);
      done();
    });

    // Call sink.abort with a function as the first argument
    // In the original code, this should treat the function as a callback
    // In the mutated code, this will incorrectly treat it as an error
    const result = sink.abort(function (err: any) {
      // This callback should be invoked with true in original code
      expect(err).toBe(true);
    });

    // The sink should return itself
    expect(result).toBe(sink);

    // Trigger the abort by calling the sink with a read function
    // that immediately returns an abort signal
    sink((abort: any, cb: any) => {
      cb(abort || true);
    });
  });
});