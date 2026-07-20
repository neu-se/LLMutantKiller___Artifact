const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should handle process.emit being a non-function without errors", () => {
    // Save original process properties
    const originalEmit = process.emit;
    const originalNextTick = process.nextTick;

    try {
      // Create a mock process object where emit is not a function
      // but nextTick is preserved
      const mockProcess = Object.create(process);
      mockProcess.emit = "not a function";
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
        // The mutation would fail because it would try to call "not a function"
      });
    } finally {
      // Restore original process properties
      process.emit = originalEmit;
      process.nextTick = originalNextTick;
    }
  });
});