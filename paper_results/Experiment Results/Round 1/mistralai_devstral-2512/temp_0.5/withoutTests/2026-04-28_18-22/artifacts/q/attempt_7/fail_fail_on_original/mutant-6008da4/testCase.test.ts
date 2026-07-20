const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q library behavior", () => {
  it("should correctly handle promise resolution in browser-like environment", (done) => {
    // This test verifies that Q works correctly in a browser-like environment
    // where process is not defined. The mutation incorrectly sets isNodeJS to true,
    // which would cause Q to try to access process.domain and fail.

    // Store original process and window
    const originalProcess = global.process;
    const originalWindow = global.window;

    try {
      // Simulate browser environment
      (global as any).process = undefined;
      (global as any).window = {};

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
      // Restore original globals
      (global as any).process = originalProcess;
      (global as any).window = originalWindow;
    }
  });
});