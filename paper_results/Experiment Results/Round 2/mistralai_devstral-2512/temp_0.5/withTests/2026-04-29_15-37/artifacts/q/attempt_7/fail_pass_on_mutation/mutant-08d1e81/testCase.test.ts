// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should handle unhandled rejections when process is available but emit is not a function", () => {
    // Save original process
    const originalProcess = global.process;

    // Create a mock process object with emit as non-function
    global.process = {
      ...originalProcess,
      emit: "not a function"
    };

    try {
      // Create a rejected promise
      const rejectedPromise = Q.reject(new Error("test error"));

      // In the original code, this should work fine since it checks typeof process.emit === "function"
      // In the mutated code, it will try to call process.emit even when it's not a function
      return rejectedPromise.then(
        () => {
          throw new Error("Promise should have been rejected");
        },
        () => {
          // Expected rejection
        }
      );
    } finally {
      // Restore original process
      global.process = originalProcess;
    }
  });
});