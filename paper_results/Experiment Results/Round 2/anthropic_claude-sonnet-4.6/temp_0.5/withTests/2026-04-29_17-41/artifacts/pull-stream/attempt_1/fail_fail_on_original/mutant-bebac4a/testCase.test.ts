import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink.abort() before source is connected", () => {
  it("should not throw when abort is called before the sink is connected to a source", (done) => {
    // Create a drain sink without connecting it to a source yet
    const sink = drain(
      function (data: unknown) { /* op */ },
      function (err: unknown) {
        // done callback - err should be true (abort signal)
        expect(err).toBeNull();
        done();
      }
    );

    // Call abort before connecting to any source (read is not set yet)
    // In original code: if(read) ... => read is undefined, so this is a no-op
    // In mutated code: if(true) => tries to call read(abort, cb) where read is undefined => TypeError
    expect(() => {
      sink.abort();
    }).not.toThrow();

    // Now connect to a source that immediately ends
    const immediateEndSource = function (abort: unknown, cb: Function) {
      cb(true); // immediately signal end
    };

    sink(immediateEndSource);
  });
});