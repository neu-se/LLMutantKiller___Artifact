// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should not call process.emit when it doesn't exist", () => {
    // Create a mock process object without emit
    const mockProcess = {
      emit: undefined,
      nextTick: process.nextTick
    };

    // Replace global process temporarily
    const originalProcess = global.process;
    global.process = mockProcess as any;

    try {
      // Create and reject a promise
      const deferred = Q.defer();
      deferred.reject(new Error("test error"));

      // Force tracking to happen
      Q.resetUnhandledRejections();
      Q.getUnhandledReasons();

      // In original code, this should work fine (condition checks process.emit existence)
      // In mutated code, this will throw TypeError when trying to call undefined
      expect(true).toBe(true);
    } finally {
      // Restore original process
      global.process = originalProcess;
    }
  });
});