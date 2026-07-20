const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should handle process.emit being undefined without errors", () => {
    // Save original process properties
    const originalEmit = process.emit;
    const originalProcess = global.process;

    try {
      // Create a mock process object where emit is undefined
      // but preserve other required properties
      const mockProcess = {
        ...process,
        emit: undefined,
        nextTick: process.nextTick
      };
      (global as any).process = mockProcess;

      // Create and reject a promise
      const deferred = Q.defer();
      const promise = deferred.promise;
      deferred.reject(new Error("Test rejection"));

      // Handle the rejection - this should trigger untrackRejection
      return promise.catch(() => {
        // Rejection handled
        return Q.delay(10);
      }).then(() => {
        // Test passes if we get here without errors
        // The mutation would fail because it would try to call undefined
      });
    } finally {
      // Restore original process
      (global as any).process = originalProcess;
    }
  });
});