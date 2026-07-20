const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should not attempt to call process.emit when it's not a function", () => {
    // Save original process.emit
    const originalEmit = process.emit;
    let errorThrown = false;

    try {
      // Replace process with an object that has emit as non-function
      const mockProcess = {
        emit: "not a function"
      };
      (global as any).process = mockProcess;

      // Create and reject a promise
      const deferred = Q.defer();
      const promise = deferred.promise;
      deferred.reject(new Error("Test rejection"));

      // Handle the rejection - this should trigger untrackRejection
      promise.catch(() => {
        // Rejection handled
      });

      // Give time for async operations
      return Q.delay(10).then(() => {
        // Test passes if we get here without errors
        // The mutation would fail because it would try to call "not a function"
      });
    } catch (e) {
      errorThrown = true;
      throw e;
    } finally {
      // Restore original process
      (global as any).process.emit = originalEmit;
    }
  });
});