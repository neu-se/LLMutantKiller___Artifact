import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink - normal stream end without done callback", () => {
  it("should not throw when stream ends normally (end === true) and no done callback is provided", () => {
    // Create a simple pull-stream source that emits one value then ends
    let callCount = 0;
    const source = (end: any, cb: (end: any, data?: any) => void) => {
      if (end) {
        cb(end);
        return;
      }
      callCount++;
      if (callCount === 1) {
        cb(null, "hello");
      } else {
        // Normal stream end with true
        cb(true);
      }
    };

    // No done callback provided - this is the critical condition
    // Original code: end === true, so `end !== true` is false, no throw
    // Mutated code: `end && true` is true when end === true, so it throws
    expect(() => {
      const sink = drain(null); // no done callback
      sink(source);
    }).not.toThrow();
  });
});