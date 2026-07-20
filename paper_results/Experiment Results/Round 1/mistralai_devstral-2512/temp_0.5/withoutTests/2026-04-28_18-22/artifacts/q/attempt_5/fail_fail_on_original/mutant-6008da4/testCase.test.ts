const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q library behavior", () => {
  it("should correctly detect Node.js environment for process.domain access", (done) => {
    // This test verifies that Q correctly detects whether it's running in a Node.js environment
    // The mutation changes isNodeJS from false to true, which would cause Q to try to access
    // process.domain even when process doesn't exist, resulting in a TypeError

    // Store original process
    const originalProcess = global.process;

    // Simulate non-Node.js environment by setting process to undefined
    (global as any).process = undefined;

    try {
      // Create a deferred promise which will trigger the nextTick code path
      const deferred = Q.defer();
      let resolved = false;

      deferred.promise.then(() => {
        resolved = true;
        done();
      });

      // Resolve the deferred promise
      deferred.resolve("test");

      // Force test to complete if promise doesn't resolve
      setTimeout(() => {
        if (!resolved) {
          done(new Error("Promise did not resolve"));
        }
      }, 100);
    } catch (error) {
      // In the mutated version, this should throw a TypeError when trying to access process.domain
      done(error);
    } finally {
      // Restore original process
      (global as any).process = originalProcess;
    }
  });
});