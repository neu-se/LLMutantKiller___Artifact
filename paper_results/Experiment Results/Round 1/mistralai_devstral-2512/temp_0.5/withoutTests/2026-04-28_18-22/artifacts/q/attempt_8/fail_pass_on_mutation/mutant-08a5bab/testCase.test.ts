const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace filtering", () => {
  it("should maintain stack trace integrity for application errors", async () => {
    // Create a function that will appear in the stack trace
    function applicationFunction() {
      throw new Error("Application error from specific function");
    }

    const deferred = Q.defer();

    try {
      applicationFunction();
    } catch (error) {
      // Store the stack before Q processing
      const originalStack = error.stack;
      const hasApplicationFrame = originalStack.includes("applicationFunction");

      // Reject with the error
      deferred.reject(error);

      return deferred.promise.then(
        () => fail("Should have rejected"),
        (e: any) => {
          // In original code: should preserve application frames
          // In mutated code: all frames filtered (isInternalFrame returns true)
          if (hasApplicationFrame) {
            expect(e.stack).toContain("applicationFunction");
          }
          // Should at least have some stack trace
          expect(e.stack.split('\n').length).toBeGreaterThan(1);
        }
      );
    }
  });
});