import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking mutation test", () => {
  it("should correctly handle process object with non-function emit", () => {
    // Store original process
    const originalProcess = global.process;

    // Create a mock process object where emit exists but is not a function
    // @ts-ignore - We're intentionally testing with a mock process
    global.process = {
      env: {},
      // Make emit a non-function value to test the condition
      emit: 123 as any
    };

    try {
      // Reset tracking
      Q.resetUnhandledRejections();

      // Create and reject a promise
      const deferred = Q.defer();
      const promise = deferred.promise;
      deferred.reject(new Error("test error"));

      // Handle the rejection to trigger untracking
      promise.catch(() => {});

      // Wait for async operations to complete
      return Q.delay(10).then(() => {
        // In the original code:
        // The condition is: if (typeof process === "object" && typeof process.emit === "function")
        // Since process.emit is not a function, the condition is false, so untracking doesn't happen
        // The rejection remains tracked

        // In the mutated code:
        // The condition becomes: if (typeof process === "object" || typeof process.emit === "function")
        // Since process is an object, the condition is true, so untracking happens
        // The rejection gets untracked

        // Therefore:
        // Original code: getUnhandledReasons().length should be 1
        // Mutated code: getUnhandledReasons().length should be 0
        expect(Q.getUnhandledReasons().length).toBe(1);
      });
    } finally {
      // Restore original process
      // @ts-ignore - Restoring original process
      global.process = originalProcess;
      Q.resetUnhandledRejections();
    }
  });
});