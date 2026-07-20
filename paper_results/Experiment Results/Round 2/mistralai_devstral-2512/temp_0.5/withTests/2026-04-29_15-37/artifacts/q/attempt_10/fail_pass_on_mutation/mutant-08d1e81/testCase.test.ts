// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should not emit unhandledRejection when process.emit is not available", () => {
    // Save original process
    const originalProcess = global.process;

    // Create a mock process object without emit function
    global.process = {
      ...originalProcess,
      emit: undefined
    };

    // Create a rejected promise
    const rejectedPromise = Q.reject(new Error("test error"));

    // In the original code, this should work fine since it checks for process.emit
    // In the mutated code, it will try to call process.emit even when it's not available
    return rejectedPromise.then(
      () => {
        throw new Error("Promise should have been rejected");
      },
      () => {
        // Expected rejection
      }
    ).finally(() => {
      // Restore original process
      global.process = originalProcess;
    });
  });
});