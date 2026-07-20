const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("filterStackString mutation test", () => {
  it("should filter internal and node frames from stack traces", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    // Add a handler that will be part of the stack trace
    return promise.catch((error: Error) => {
      // The original implementation should filter out internal Q frames
      // The mutated implementation returns an empty string, which would break this
      expect(error.stack).toBeTruthy();
      expect(error.stack!.length).toBeGreaterThan(0);

      // Check that internal Q frames are filtered out
      const stackLines = error.stack!.split('\n');
      const hasFilteredFrames = stackLines.some(line =>
        line.includes("at Promise") ||
        line.includes("at Q.") ||
        line.includes("at promiseDispatch")
      );
      expect(hasFilteredFrames).toBe(false);
    });
  });
});