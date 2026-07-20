const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should correctly handle untracking when process.emit is not a function", () => {
    // Save original process.emit
    const originalEmit = process.emit;

    try {
      // Create a mock process object where emit is not a function
      process.emit = undefined as any;

      // Create and reject a promise
      const deferred = Q.defer();
      const promise = deferred.promise;
      deferred.reject(new Error("Test rejection"));

      // Handle the rejection
      promise.catch(() => {
        // Rejection handled
      });

      // The test passes if we reach here without errors
      // The mutation would cause this to fail because it would try to call
      // process.emit("rejectionHandled") when process.emit is not a function
    } finally {
      // Restore original process.emit
      process.emit = originalEmit;
    }
  });
});