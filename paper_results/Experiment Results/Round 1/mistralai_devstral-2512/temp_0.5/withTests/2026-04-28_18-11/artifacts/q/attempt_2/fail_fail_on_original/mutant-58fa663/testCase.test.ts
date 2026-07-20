import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking mutation test", () => {
  it("should not track rejections when process.emit is not a function", () => {
    // Store original process
    const originalProcess = global.process;

    // Create a mock process object that exists but doesn't have emit function
    global.process = {
      env: {},
      // Explicitly make emit not a function
      emit: "not a function"
    };

    try {
      // Reset tracking
      Q.resetUnhandledRejections();

      // Create and reject a promise
      const deferred = Q.defer();
      deferred.reject(new Error("test error"));

      // In the original code, this rejection should NOT be tracked
      // because process.emit is not a function (it's a string)
      // The condition is: if (typeof process === "object" && typeof process.emit === "function")
      // In the mutated code, the condition becomes:
      // if (typeof process === "object" || typeof process.emit === "function")
      // This would incorrectly track the rejection because process is an object

      // The test should pass on original (no tracking) and fail on mutated (tracks)
      expect(Q.getUnhandledReasons().length).toBe(0);
    } finally {
      // Restore original process
      global.process = originalProcess;
      Q.resetUnhandledRejections();
    }
  });
});