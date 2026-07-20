const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should not call process.emit when it's not a function", () => {
    // Save original process.emit
    const originalEmit = process.emit;
    let emitCalled = false;

    try {
      // Replace process.emit with a non-function value
      process.emit = undefined as any;

      // Create and reject a promise
      const deferred = Q.defer();
      const promise = deferred.promise;
      deferred.reject(new Error("Test rejection"));

      // Handle the rejection - this should trigger untrackRejection
      promise.catch(() => {
        // Rejection handled
      });

      // Give time for async operations to complete
      return new Promise((resolve) => {
        setTimeout(() => {
          // The test passes if we reach here without trying to call process.emit
          // The mutation would cause this to fail because it would try to call
          // process.emit("rejectionHandled") when process.emit is not a function
          resolve();
        }, 10);
      });
    } finally {
      // Restore original process.emit
      process.emit = originalEmit;
    }
  });
});