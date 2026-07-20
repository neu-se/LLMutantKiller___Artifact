const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q stack trace filtering", () => {
  it("should filter internal frames from stack traces", () => {
    // Create a promise that will generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    // Enable long stack traces
    Q.longStackSupport = true;

    return promise.catch((error: Error) => {
      const stack = error.stack || "";
      const lines = stack.split("\n");

      // Check if any internal Q frames remain in the stack trace
      const hasInternalFrames = lines.some(line =>
        line.includes("q.js") && line.includes("filterStackString")
      );

      // Original code should filter out internal frames (false)
      // Mutated code (i >= lines.length) won't execute the loop, leaving internal frames (true)
      expect(hasInternalFrames).toBe(false);
    });
  });
});