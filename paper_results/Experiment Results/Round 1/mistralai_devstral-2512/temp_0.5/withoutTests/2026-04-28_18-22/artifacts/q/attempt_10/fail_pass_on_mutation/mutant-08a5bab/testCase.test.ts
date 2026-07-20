const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace filtering", () => {
  it("should preserve non-Q stack frames in error stacks", async () => {
    // Create an error with a specific stack trace
    function createTestError() {
      return new Error("Test error from createTestError");
    }

    const error = createTestError();
    const deferred = Q.defer();

    // Store original stack for comparison
    const originalStack = error.stack;
    const hasTestFrame = originalStack.includes("createTestError");

    // Reject with the error
    deferred.reject(error);

    try {
      await deferred.promise;
    } catch (e: any) {
      // In original code: should preserve non-Q frames
      // In mutated code: all frames filtered (isInternalFrame returns true)
      if (hasTestFrame) {
        expect(e.stack).toContain("createTestError");
      }

      // Should maintain reasonable stack depth
      const originalLines = originalStack.split('\n').length;
      const resultLines = e.stack.split('\n').length;
      expect(resultLines).toBeGreaterThan(Math.floor(originalLines / 2));
    }
  });
});