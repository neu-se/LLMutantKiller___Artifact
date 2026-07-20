import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain without done callback on normal stream end", () => {
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

    // Without a done callback, when end === true:
    // Original: else if(end && end !== true) => false, so does NOT throw
    // Mutated:  else if(end && true) => true, so DOES throw
    expect(() => {
      const sink = drain(null); // no done callback
      sink(source);
    }).not.toThrow();
  });
});