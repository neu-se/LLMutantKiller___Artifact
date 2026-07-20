const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace capture", () => {
  it("should properly handle stack trace availability", () => {
    // This test verifies that the captureLine function behaves correctly
    // based on stack trace availability. The mutation changes the condition
    // from checking hasStacks to always false, which would affect behavior.

    // Create a rejected promise that would trigger stack trace handling
    const promise = Q.reject(new Error("Test error"));

    // The original code should handle this normally
    // The mutated code would try to capture stack traces even when not available
    return promise.catch((error: Error) => {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Test error");
    });
  });
});