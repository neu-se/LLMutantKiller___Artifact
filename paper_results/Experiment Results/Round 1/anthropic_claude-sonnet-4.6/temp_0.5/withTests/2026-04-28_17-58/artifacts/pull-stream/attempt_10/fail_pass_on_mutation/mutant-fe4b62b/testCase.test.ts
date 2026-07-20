import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain.abort", () => {
  it("abort callback receives the end value from the source", (done) => {
    let pendingCb: ((end: any, data?: any) => void) | null = null;

    function hangingSource(end: any, cb: (end: any, data?: any) => void) {
      if (end) {
        cb(end);
      } else {
        pendingCb = cb;
      }
    }

    const abortCbArgs: any[] = [];

    const sink = drain(
      function op() {},
      function onDone(err: any) {}
    );

    sink(hangingSource);

    // Source is now hanging - pendingCb is set
    // Call abort with a callback function
    // Original: err=true, abort=true, read(true, fn) -> source calls fn(true)
    // Mutated:  err=false, abort=false||true=true, read(true, fn) -> source calls fn(true)
    // Both identical - so let's check abort value stored via the 'abort' variable
    // by calling abort AGAIN after first abort to see what abort is set to
    sink.abort(function firstAbortCb(err: any) {
      abortCbArgs.push(err);
      // Now call abort again - abort is already true
      // The second call: err is undefined (no arg), abort = undefined||true = true
      // read(true, undefined||function(){}) - cb is empty function
      // So firstAbortCb only gets called once with err=true
      expect(err).toBe(true);
      expect(abortCbArgs.length).toBe(1);
      done();
    });
  });
});