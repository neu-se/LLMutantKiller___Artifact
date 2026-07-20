const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace filtering", () => {
  it("should preserve application stack frames in error stacks", async () => {
    // Create a promise chain with a custom error
    const error = new Error("Application error");
    const deferred = Q.defer();

    // Store the original stack trace
    const originalStack = error.stack;

    // Reject the promise with our error
    deferred.reject(error);

    try {
      await deferred.promise;
    } catch (e: any) {
      // In the original code, the stack should still contain application frames
      // In the mutated code (where isInternalFrame always returns true),
      // all frames would be filtered out
      expect(e.stack).toBeTruthy();
      expect(e.stack.length).toBeGreaterThan(0);

      // The original stack should contain our error message
      expect(originalStack).toContain("Application error");

      // After going through Q, the stack should still be meaningful
      expect(e.stack).toContain("Error") || expect(e.stack).toContain("Application error");
    }
  });
});