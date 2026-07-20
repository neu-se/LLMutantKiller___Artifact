// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should not attempt to emit when process is not available", () => {
    // Save original process
    const originalProcess = global.process;

    // Set process to null to simulate non-Node environment
    global.process = null as any;

    try {
      // Create a rejected promise
      const rejectedPromise = Q.reject(new Error("test error"));

      // In the original code, this should work fine since it checks for process.emit
      // In the mutated code, it will try to access process.emit on null, causing a TypeError
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