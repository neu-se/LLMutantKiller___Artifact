import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain - normal stream termination without done callback", () => {
  it("should not throw when stream ends normally (end === true) and no done callback is provided", () => {
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

    // Without a done callback, when stream ends normally (end === true),
    // the original code should NOT enter the else-if branch (end !== true fails)
    // The mutated code WOULD enter it (end && true is truthy) and throw
    expect(() => {
      const sink = drain((data: any) => {
        // op function - just consume data
      }); // no done callback
      sink(source);
    }).not.toThrow();
  });
});