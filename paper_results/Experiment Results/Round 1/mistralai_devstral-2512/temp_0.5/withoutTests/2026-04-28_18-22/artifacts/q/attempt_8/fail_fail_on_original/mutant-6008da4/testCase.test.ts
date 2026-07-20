const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q library behavior", () => {
  it("should correctly handle promise resolution when process is defined but not Node.js", (done) => {
    // This test verifies that Q works correctly when process exists but isn't a Node.js process
    // The mutation incorrectly sets isNodeJS to true, which would cause Q to try to access
    // process.domain even when process isn't a real Node.js process object

    // Store original process
    const originalProcess = global.process;

    try {
      // Create a fake process object that isn't a real Node.js process
      (global as any).process = {
        toString: () => "[object Object]" // Not "[object process]" like real Node.js
      };

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