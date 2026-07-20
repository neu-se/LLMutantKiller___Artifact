const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q stack trace filtering", () => {
  it("should correctly filter stack traces", () => {
    // Create a promise chain that will generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    // Add a rejection handler to trigger stack trace processing
    return promise.catch((error: Error) => {
      // The error should have a stack trace
      expect(error.stack).toBeDefined();

      // The stack trace should not contain internal Q frames
      const lines = error.stack?.split("\n") || [];
      const hasInternalFrames = lines.some((line: string) =>
        line.includes("q.js") || line.includes("at filterStackString")
      );

      // In the original code, internal frames should be filtered out
      // In the mutated code, the loop condition is wrong, so filtering won't work
      expect(hasInternalFrames).toBe(false);
    });
  });
});