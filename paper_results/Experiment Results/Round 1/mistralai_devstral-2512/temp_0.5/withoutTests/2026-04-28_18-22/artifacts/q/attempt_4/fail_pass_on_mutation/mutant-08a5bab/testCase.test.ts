const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace filtering", () => {
  it("should correctly identify internal stack frames", async () => {
    // Create a scenario that will generate a stack trace with Q internal frames
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Get the stack trace before resolving
    const stackBefore = error.stack;

    // Resolve the promise to trigger stack trace filtering
    deferred.reject(error);

    try {
      await deferred.promise;
    } catch (e: any) {
      // The mutation changes the isInternalFrame function to always return true
      // This should cause all stack frames to be filtered out
      // In the original code, some frames should remain
      expect(e.stack).toBeTruthy();
      expect(e.stack.split('\n').length).toBeGreaterThan(1);
    }
  });
});