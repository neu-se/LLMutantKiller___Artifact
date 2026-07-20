const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q stack trace filtering", () => {
  it("should filter out internal stack frames from error traces", () => {
    // Create a deeply nested promise chain to generate a complex stack trace
    let promise = Q.reject(new Error("Deep error"));
    for (let i = 0; i < 5; i++) {
      promise = promise.catch((e: Error) => {
        throw new Error(`Wrapped ${i}: ${e.message}`);
      });
    }

    // Enable long stack traces
    Q.longStackSupport = true;

    return promise.catch((finalError: Error) => {
      const stack = finalError.stack || "";
      const lines = stack.split("\n");

      // Count lines that should be filtered (internal Q frames)
      const internalFrames = lines.filter(line =>
        line.includes("q.js") ||
        line.includes("filterStackString") ||
        line.includes("makeStackTraceLong")
      );

      // Original code should filter most internal frames (< 30% of total)
      // Mutated code (i >= lines.length) won't filter anything
      const ratio = internalFrames.length / lines.length;
      expect(ratio).toBeLessThan(0.3);
    });
  });
});