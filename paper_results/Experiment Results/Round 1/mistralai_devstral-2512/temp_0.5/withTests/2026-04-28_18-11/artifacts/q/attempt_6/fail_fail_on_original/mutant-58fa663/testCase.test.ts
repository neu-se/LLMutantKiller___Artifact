import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking mutation test", () => {
  it("should not track rejections when process is not an object", () => {
    // Store original process
    const originalProcess = global.process;

    // Set process to null (not an object)
    // @ts-ignore - We're intentionally testing with null process
    global.process = null;

    try {
      // Reset tracking
      Q.resetUnhandledRejections();

      // Create and reject a promise
      const deferred = Q.defer();
      deferred.reject(new Error("test error"));

      // In the original code, this rejection should NOT be tracked
      // because typeof process === "object" is false
      // The condition is: if (typeof process === "object" && typeof process.emit === "function")
      // In the mutated code, the condition becomes:
      // if (typeof process === "object" || typeof process.emit === "function")
      // This would still not track because both conditions are false

      // Now test the case where the mutation would make a difference
      // Create a process object without emit function
      // @ts-ignore - We're intentionally testing with a mock process
      global.process = {
        env: {}
        // No emit property
      };

      // Reset and test again
      Q.resetUnhandledRejections();
      const deferred2 = Q.defer();
      deferred2.reject(new Error("test error 2"));

      // In original: typeof process.emit === "function" is false, so no tracking
      // In mutated: typeof process === "object" is true, so it would track
      // But we need to verify the original behavior first
      expect(Q.getUnhandledReasons().length).toBe(0);
    } finally {
      // Restore original process
      // @ts-ignore - Restoring original process
      global.process = originalProcess;
      Q.resetUnhandledRejections();
    }
  });
});