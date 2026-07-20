import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain behavior when stream ends normally without done callback", () => {
  it("should not throw when stream ends normally (end === true) and no done callback is provided", (done) => {
    // Create a simple source that emits one value then ends normally
    let callCount = 0;
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
        return;
      }
      if (callCount === 0) {
        callCount++;
        cb(null, 42);
      } else {
        // Normal end: end === true
        cb(true);
      }
    };

    // The mutation causes end === true to enter the else-if branch and throw
    // The original code correctly skips that branch when end === true
    expect(() => {
      const sink = drain(
        (data: any) => {
          // op callback - just consume the data
        }
        // No done callback - this is the critical part
      );
      sink(source);
    }).not.toThrow();

    // Give the synchronous stream time to complete
    setImmediate(() => {
      done();
    });
  });
});