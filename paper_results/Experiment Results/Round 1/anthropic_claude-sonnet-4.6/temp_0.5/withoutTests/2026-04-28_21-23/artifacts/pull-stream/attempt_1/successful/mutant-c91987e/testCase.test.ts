import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink abort behavior", () => {
  it("should call the callback when abort is called after read is set", (done) => {
    // Create a source that never ends (infinite stream)
    let readCallback: ((end: any, data?: any) => void) | null = null;
    
    const source = (_abort: any, cb: (end: any, data?: any) => void) => {
      if (_abort) {
        cb(_abort);
        return;
      }
      // Store the callback but don't call it immediately (simulate async)
      readCallback = cb;
    };

    const abortCallback = jest.fn((err?: any) => {
      // This should be called when abort completes
      done();
    });

    const sink = drain(
      (data: any) => {
        // op function - keep reading
        return true;
      },
      (err: any) => {
        // done callback
      }
    );

    // Connect the source to the sink - this sets read
    sink(source);

    // Now call abort - in the original code, since read is set, it should call read(abort, cb)
    // which will trigger the abort callback
    // In the mutated code (if(false)), the read is never called, so abortCallback is never invoked
    sink.abort(abortCallback);

    // Simulate the source responding to the abort
    if (readCallback) {
      // The original code calls read(abort, cb), which means readCallback should have been replaced
      // by the abort call. We need to trigger the pending read callback.
      readCallback(null, "some data");
    }
  });
});