const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace filtering", () => {
  it("should preserve non-Q stack frames in error stacks", async () => {
    // Create a custom error with a known stack trace
    function createErrorWithStack() {
      try {
        throw new Error("Test error");
      } catch (e) {
        return e;
      }
    }

    const error = createErrorWithStack();
    const deferred = Q.defer();

    // Store original stack for comparison
    const originalStack = error.stack;

    // Reject with the error
    deferred.reject(error);

    try {
      await deferred.promise;
    } catch (e: any) {
      // In the original code, non-Q frames should be preserved
      // In the mutated code (where isInternalFrame always returns true),
      // all frames would be filtered out, leaving an empty or minimal stack
      expect(e.stack).toContain("createErrorWithStack");
      expect(e.stack.split('\n').length).toBeGreaterThan(2);
    }
  });
});