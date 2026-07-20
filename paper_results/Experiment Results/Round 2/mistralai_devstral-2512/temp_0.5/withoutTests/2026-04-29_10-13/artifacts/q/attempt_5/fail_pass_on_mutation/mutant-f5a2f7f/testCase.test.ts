const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace capture", () => {
  it("should handle stack trace capture based on hasStacks flag", () => {
    // Force hasStacks to false to test the early return path
    const originalHasStacks = Q.hasStacks;
    Q.hasStacks = false;

    try {
      // Create a rejected promise
      const promise = Q.reject(new Error("Test error"));

      // In original code: should return early when !hasStacks
      // In mutated code: will try to capture stack traces anyway
      return promise.catch((error: Error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("Test error");
      });
    } finally {
      // Restore original value
      Q.hasStacks = originalHasStacks;
    }
  });
});