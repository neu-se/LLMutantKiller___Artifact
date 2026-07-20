import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking mutation test", () => {
  it("should correctly track rejections based on process.emit being a function", () => {
    // Store original process
    const originalProcess = global.process;

    // Create a mock process object where emit is not a function
    // @ts-ignore - We're intentionally testing with a mock process
    global.process = {
      env: {},
      // Make emit a non-function value
      emit: 123 as any
    };

    try {
      // Reset tracking
      Q.resetUnhandledRejections();

      // Create and reject a promise
      const deferred = Q.defer();
      deferred.reject(new Error("test error"));

      // In the original code, this rejection should NOT be tracked
      // because typeof process.emit === "function" is false
      // The condition is: if (typeof process === "object" && typeof process.emit === "function")
      // In the mutated code, the condition becomes:
      // if (typeof process === "object" || typeof process.emit === "function")
      // This would incorrectly track the rejection because process is an object

      // The test should pass on original (no tracking) and fail on mutated (tracks)
      expect(Q.getUnhandledReasons().length).toBe(0);
    } finally {
      // Restore original process
      // @ts-ignore - Restoring original process
      global.process = originalProcess;
      Q.resetUnhandledRejections();
    }
  });
});