import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain.abort", () => {
  it("should pass truthy abort signal to source when abort is called with only a callback", () => {
    let endValueReceived: any = "not-called";

    // Synchronous source that immediately responds to reads/aborts
    function source(end: any, cb: (end: any, data?: any) => void) {
      endValueReceived = end;
      if (end) {
        cb(end);
      } else {
        cb(null, 42);
      }
    }

    const abortCallbackValues: any[] = [];

    const sink = drain(
      function op() { return false; }, // immediately signal abort from op
      function onDone() {}
    );

    // Connect source first
    sink(source);

    // Reset after initial reads triggered by connecting
    endValueReceived = "not-called";

    // Now call abort with just a callback
    // Original: err becomes true, so read(true, cb) is called -> source gets end=true
    // Mutated: err becomes false, so read(false, cb) is called -> source gets end=false
    sink.abort(function(err: any) {
      abortCallbackValues.push(err);
    });

    // With original: endValueReceived should be true (truthy abort)
    // With mutated: endValueReceived should be false (falsy, not an abort)
    expect(endValueReceived).toBeTruthy();
  });
});