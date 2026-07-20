import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain.abort with function as first argument", () => {
  it("should treat a function argument as the done callback when no error is provided", (done) => {
    // Create an infinite source that never ends on its own
    let pendingCb: ((end: any, data: any) => void) | null = null;
    
    const infiniteSource = (abort: any, cb: (end: any, data: any) => void) => {
      if (abort) {
        cb(abort, null);
        return;
      }
      // Simulate async: hold the callback
      pendingCb = cb;
    };

    const sink = drain(
      (data: any) => {
        // op: do nothing
      },
      (err: any) => {
        // This is the done callback passed to drain constructor
        // Should not be called in this test path
      }
    );

    // Connect the source to the sink
    sink(infiniteSource);

    // Resolve the first pending read so the stream is active
    if (pendingCb) {
      const cb = pendingCb;
      pendingCb = null;
      cb(null, 42);
    }

    // Now call abort with only a callback function (no error argument)
    // In original: typeof err === 'function' is true, so cb = err, err = true
    // In mutated: "" == typeof err is false, so the function is treated as err, not cb
    (sink as any).abort(function(err: any) {
      // In the original code, this callback is called when the stream is aborted
      // The err here should be null or true (end of stream), not the function itself
      done();
    });

    // Resolve any pending read that abort triggered
    if (pendingCb) {
      const cb = pendingCb;
      pendingCb = null;
      cb(true, null);
    }
  });
});