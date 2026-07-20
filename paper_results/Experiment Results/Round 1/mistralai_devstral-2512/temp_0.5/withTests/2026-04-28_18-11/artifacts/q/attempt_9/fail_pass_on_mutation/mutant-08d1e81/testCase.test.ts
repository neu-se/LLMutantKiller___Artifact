// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should properly check process.emit existence before using it", () => {
    // Create a mock process object without emit function
    const mockProcess = {
      ...process,
      emit: undefined
    };

    // Temporarily replace process
    const originalProcess = global.process;
    global.process = mockProcess;

    // Track if emit was called
    let emitCalled = false;
    Object.defineProperty(global.process, 'emit', {
      get: () => {
        return () => {
          emitCalled = true;
          return true;
        };
      },
      configurable: true
    });

    try {
      // Create and reject a promise to trigger tracking
      const deferred = Q.defer();
      deferred.reject(new Error("test error"));
      Q.resetUnhandledRejections();
      Q.getUnhandledReasons();
    } finally {
      // Restore original process
      global.process = originalProcess;
    }

    // In original code, emit should not be called (condition checks existence)
    // In mutated code, emit will be called (condition is always true)
    expect(emitCalled).toBe(false);
  });
});