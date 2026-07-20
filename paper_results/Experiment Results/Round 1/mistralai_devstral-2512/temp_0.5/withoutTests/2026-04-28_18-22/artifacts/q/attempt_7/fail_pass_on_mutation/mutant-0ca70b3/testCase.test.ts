const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q stack trace filtering", () => {
  it("should properly filter internal stack frames", () => {
    // Create a promise chain that will generate stack traces
    const promise = Q.reject(new Error("Test error"));

    // Enable long stack traces
    Q.longStackSupport = true;

    return promise.catch((error: Error) => {
      const stack = error.stack || "";
      const lines = stack.split("\n");

      // Count lines that contain "q.js" (internal frames)
      const internalFrameCount = lines.filter(line =>
        line.includes("q.js")
      ).length;

      // Original code should filter most internal frames (count should be 0)
      // Mutated code (i >= lines.length) won't filter anything (count will be > 0)
      expect(internalFrameCount).toBe(0);
    });
  });
});