import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking mutation test", () => {
  it("should correctly handle process object without emit function", () => {
    // Store original process
    const originalProcess = global.process;

    // Create a mock process object that exists but doesn't have emit function
    // @ts-ignore - We're intentionally testing with a mock process
    global.process = {
      env: {}
      // No emit property at all
    };

    try {
      // Reset tracking
      Q.resetUnhandledRejections();

      // Create and reject a promise
      const deferred = Q.defer();
      deferred.reject(new Error("test error"));

      // In the original code, this rejection should NOT be tracked
      // because process.emit doesn't exist (typeof process.emit === "undefined")
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