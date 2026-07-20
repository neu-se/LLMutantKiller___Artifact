// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should handle unhandled rejections without process.emit", () => {
    // Save original process
    const originalProcess = global.process;

    // Create a mock process object without emit function
    global.process = { ...originalProcess, emit: undefined };

    // Create a rejected promise that won't be handled
    const rejectedPromise = Q.reject(new Error("test error"));

    // In the original code, this should work fine since it checks for process.emit
    // In the mutated code, it will try to call process.emit even when it's not a function
    // which should cause a TypeError
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