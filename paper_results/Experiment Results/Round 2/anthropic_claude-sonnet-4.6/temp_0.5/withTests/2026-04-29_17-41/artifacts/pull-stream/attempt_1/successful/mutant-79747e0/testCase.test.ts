import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain without done callback on normal stream end", () => {
  it("should not throw when stream ends normally and no done callback is provided", (done) => {
    // Create a simple source that emits one value then ends
    let i = 0;
    const values = [1, 2, 3];
    
    function source(abort: any, cb: (end: any, data?: any) => void) {
      if (abort) {
        cb(abort);
        return;
      }
      if (i >= values.length) {
        cb(true); // normal end
        return;
      }
      cb(null, values[i++]);
    }

    // Create drain WITHOUT a done callback - this is the key
    // In original: when stream ends, `if(done)` is false, so done() is not called
    // In mutated: `if(true)` means done() is called even when undefined -> TypeError
    const sink = drain(function op(data: any) {
      // process data normally
    }); // no done callback provided

    // We need to catch any error that occurs
    let errorThrown: Error | null = null;
    
    // Override the sink to catch errors
    const originalSink = sink;
    
    try {
      originalSink(source);
    } catch (e) {
      errorThrown = e as Error;
    }

    // Use setImmediate to wait for async completion
    setImmediate(() => {
      // In original code: no error should be thrown
      // In mutated code: TypeError because done is not a function
      expect(errorThrown).toBeNull();
      done();
    });
  });
});