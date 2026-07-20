const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q library behavior", () => {
  it("should correctly handle promise resolution in non-Node.js environment", (done) => {
    // This test verifies that Q correctly handles promise resolution
    // when not in a Node.js environment (where process.nextTick is not available)
    // The mutation incorrectly sets isNodeJS to true, which would cause
    // Q to try to access process.domain even when process doesn't exist

    // Store original process
    const originalProcess = global.process;

    // Simulate non-Node.js environment by setting process to undefined
    (global as any).process = undefined;

    try {
      // Create a simple resolved promise
      const promise = Q.resolve("test value");

      // Verify it resolves correctly
      promise.then((value: any) => {
        expect(value).toBe("test value");
        done();
      }).catch((error: any) => {
        done(error);
      });

      // Force test to complete if promise doesn't resolve
      setTimeout(() => {
        done(new Error("Promise did not resolve"));
      }, 100);
    } finally {
      // Restore original process
      (global as any).process = originalProcess;
    }
  });
});