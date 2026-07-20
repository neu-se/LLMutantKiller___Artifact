import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink abort with specific error", () => {
  it("should pass the abort error (not just true) to read when abort is set and op returns false", (done) => {
    const specificError = new Error("specific abort error");
    let readCallArgs: any[] = [];
    let callCount = 0;

    // Create a source that provides one data item, then we'll check what abort value was passed
    const source = (end: any, cb: Function) => {
      callCount++;
      if (callCount === 1 && end === null) {
        // First read: provide data
        cb(null, "data");
      } else {
        // Subsequent reads: capture the abort value passed
        readCallArgs.push(end);
        cb(end || true, null);
      }
    };

    const specificAbortError = new Error("my specific abort");
    
    // op returns false to trigger the abort path
    const op = (data: any) => false;

    const sink = drain(op, (err: any) => {
      // Check that the error passed to read was the specificAbortError, not just `true`
      // In original: read(abort || true, ...) => read(specificAbortError, ...)
      // In mutated: read(true, ...) => read(true, ...)
      try {
        expect(readCallArgs.length).toBeGreaterThan(0);
        expect(readCallArgs[0]).toBe(specificAbortError);
        done();
      } catch (e) {
        done(e);
      }
    });

    // Set abort before connecting source
    sink.abort(specificAbortError);
    sink(source);
  });
});