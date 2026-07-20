const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should not attempt to call process.emit when it's not a function", () => {
    // Save original process properties
    const originalEmit = process.emit;
    const originalProcess = global.process;
    let emitCalled = false;

    try {
      // Create a mock process object where emit is not a function
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
      promise.catch(() => {
        // Rejection handled
      });

      // Give time for async operations
      return Q.delay(10).then(() => {
        // Test passes if we get here without errors
        // The mutation would fail because it would try to call undefined
      });
    } catch (e) {
      // If we get here with an error about calling undefined, the mutation is present
      if (e.message.includes("not a function")) {
        throw new Error("Mutation detected: process.emit was called when not a function");
      }
      throw e;
    } finally {
      // Restore original process
      (global as any).process = originalProcess;
    }
  });
});