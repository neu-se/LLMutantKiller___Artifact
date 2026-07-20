import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain.abort", () => {
  it("should invoke the callback with a truthy end value when abort is called with only a function argument", (done) => {
    let pendingCb: ((end: any, data?: any) => void) | null = null;

    function hangingSource(end: any, cb: (end: any, data?: any) => void) {
      if (end) {
        cb(end); // respond with the truthy abort signal
      } else {
        pendingCb = cb; // hang on normal reads
      }
    }

    const sink = drain(
      function op() {},
      function onDone() {}
    );

    sink(hangingSource);

    // Source should now be hanging waiting for data
    expect(pendingCb).not.toBeNull();

    // Call abort passing only a callback (no explicit error)
    // Original: err=true -> abort=true -> read(true, cb) -> source calls cb(true) -> cb receives true
    // Mutated:  err=false -> abort=false -> read(false, cb) -> source hangs again (treats as normal read)
    sink.abort(function abortCallback(err: any) {
      // Original: err is true (truthy) - test passes
      // Mutated: this callback is never called (source hangs) - test times out/fails
      expect(err).toBeTruthy();
      done();
    });
  });
});