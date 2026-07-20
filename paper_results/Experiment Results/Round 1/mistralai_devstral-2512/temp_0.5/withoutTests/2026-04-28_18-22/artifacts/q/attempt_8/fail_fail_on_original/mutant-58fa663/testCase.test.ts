const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should not call process.emit when it's not a function", () => {
    // Save original process.emit
    const originalEmit = process.emit;
    let emitCallCount = 0;

    try {
      // Replace process.emit with a mock that counts calls
      process.emit = function(...args: any[]) {
        emitCallCount++;
        return originalEmit?.apply(this, args);
      };

      // Create a mock process object where emit is not a function
      const mockProcess = {
        emit: undefined
      };

      // Temporarily replace global process
      const originalProcess = global.process;
      (global as any).process = mockProcess;

      // Create and reject a promise
      const deferred = Q.defer();
      const promise = deferred.promise;
      deferred.reject(new Error("Test rejection"));

      // Handle the rejection - this should trigger untrackRejection
      promise.catch(() => {
        // Rejection handled
      });

      // Restore original process
      (global as any).process = originalProcess;

      // Now restore the counting emit
      process.emit = originalEmit;

      // The test passes if emitCallCount is 0 (no calls were made)
      // The mutation would cause emitCallCount to be > 0 because it would
      // try to call process.emit even when it's not a function
      if (emitCallCount > 0) {
        throw new Error("process.emit was called when it shouldn't have been");
      }
    } finally {
      // Ensure we always restore the original emit
      process.emit = originalEmit;
    }
  });
});