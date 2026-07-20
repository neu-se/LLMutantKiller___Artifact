const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should handle process.emit being undefined without throwing", () => {
    // Save original process.emit
    const originalEmit = process.emit;

    try {
      // Set process.emit to undefined (not a function)
      process.emit = undefined as any;

      // Create and reject a promise
      const deferred = Q.defer();
      const promise = deferred.promise;
      deferred.reject(new Error("Test rejection"));

      // Handle the rejection - this triggers untrackRejection
      promise.catch(() => {
        // Rejection handled
      });

      // Force async operations to complete
      return Q.delay(10).then(() => {
        // If we get here without errors, the test passes
        // The mutation would cause this to fail because it would try to call
        // process.emit("rejectionHandled") when process.emit is undefined
      });
    } finally {
      // Restore original process.emit
      process.emit = originalEmit;
    }
  });
});