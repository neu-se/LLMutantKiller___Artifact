import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking mutation test", () => {
  it("should not track rejections when process is undefined", () => {
    // Store original process
    const originalProcess = global.process;

    // Set process to undefined to test the case where process doesn't exist
    // @ts-ignore - We're intentionally testing with undefined process
    global.process = undefined;

    try {
      // Reset tracking
      Q.resetUnhandledRejections();

      // Create and reject a promise
      const deferred = Q.defer();
      deferred.reject(new Error("test error"));

      // In the original code, this rejection should NOT be tracked
      // because process is undefined (typeof undefined === "undefined")
      // The condition is: if (typeof process === "object" && typeof process.emit === "function")
      // In the mutated code, the condition becomes:
      // if (typeof process === "object" || typeof process.emit === "function")
      // This would still not track because both conditions are false

      // However, we need to test a case where the mutation would make a difference
      // Let's test with a process object that has emit as a non-function
      // @ts-ignore - We're intentionally testing with a mock process
      global.process = {
        env: {},
        emit: null // emit exists but is not a function
      };

      // Reset and test again
      Q.resetUnhandledRejections();
      const deferred2 = Q.defer();
      deferred2.reject(new Error("test error 2"));

      // In original: typeof process.emit === "function" is false, so no tracking
      // In mutated: typeof process === "object" is true, so it would track
      expect(Q.getUnhandledReasons().length).toBe(0);
    } finally {
      // Restore original process
      // @ts-ignore - Restoring original process
      global.process = originalProcess;
      Q.resetUnhandledRejections();
    }
  });
});