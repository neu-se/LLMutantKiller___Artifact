import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain.abort with callback-only argument", () => {
  it("should abort the stream with a truthy error when abort is called with only a callback", (done) => {
    let abortValue: any = undefined;

    // A source that captures the abort value passed to it
    function source(end: any, cb: (end: any, data?: any) => void) {
      if (end) {
        abortValue = end;
        cb(end);
        return;
      }
      // Hang - never call cb unless aborted
    }

    const sink = drain(
      function op() {},
      function onDone(err: any) {
        // The done callback should be called
        // With original code: abort = true, so err passed to done should be null (end === true ? null : end)
        // With mutated code: abort = false, stream won't abort properly
        expect(abortValue).toBeTruthy();
        done();
      }
    );

    sink(source);

    // Call abort with just a callback (no error argument)
    sink.abort(function(err: any) {
      // This callback is called when the source acknowledges the abort
      // With original: abort = true, read is called with true
      // With mutated: abort = false, read is called with false (falsy - not an abort)
      expect(abortValue).toBeTruthy();
    });
  });
});