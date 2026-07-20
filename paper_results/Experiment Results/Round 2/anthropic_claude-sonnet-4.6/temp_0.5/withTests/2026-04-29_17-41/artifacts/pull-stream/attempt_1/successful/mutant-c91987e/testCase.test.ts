import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink.abort()", () => {
  it("should call the callback when abort is called after sink is connected to a source", (done) => {
    // Create a source that hangs (never ends on its own)
    // This simulates an async source that is waiting
    let pendingCb: ((end: any, data?: any) => void) | null = null;
    
    const hangingSource = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
        return;
      }
      // Store the callback but never call it (simulates a stalled/hanging source)
      pendingCb = cb;
    };

    const sink = drain(
      (_data: any) => {
        // op: do nothing with data
      },
      (err: any) => {
        // done callback - should be called when stream ends
      }
    );

    // Connect the sink to the source (this assigns `read`)
    sink(hangingSource);

    // Now the source is hanging (pendingCb is set but not called)
    // Call abort with a callback - in original code, this calls read(abort, cb)
    // which triggers the source to call cb(abort), which calls our abort callback
    const abortCallback = jest.fn((err: any) => {
      // The abort callback should be called
      expect(abortCallback).toHaveBeenCalled();
      done();
    });

    sink.abort(abortCallback);

    // In the mutated code, if(false) means read is never called,
    // so abortCallback is never called, and done() is never called,
    // causing the test to timeout
  });
});