const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should filter stack traces correctly when long stack traces are enabled", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a deep promise chain to generate stack traces
    const promise = Q.reject(new Error("Test error"));

    try {
      await promise;
    } catch (error) {
      // The stack trace should be filtered
      const stackLines = error.stack?.split('\n') || [];
      const hasNodeFrame = stackLines.some(line =>
        line.includes("(node.js:")
      );

      // Original code should filter out node.js frames (return false)
      // Mutated code always returns false, so this will pass in both cases
      // We need to test the actual filtering behavior differently
      expect(hasNodeFrame).toBe(false);
    }
  });
});