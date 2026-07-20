// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should not emit unhandledRejection when process is not available", () => {
    // Save the original process object
    const originalProcess = global.process;

    // Remove process from global to simulate non-Node environment
    delete global.process;

    // Create a rejected promise
    const rejectedPromise = Q.reject(new Error("test error"));

    // Restore process
    global.process = originalProcess;

    // The test passes if no error is thrown during the above operations
    // In the mutated version, the condition `if (true)` would try to access
    // process.emit even when process is not available, causing an error
    return rejectedPromise.then(
      () => {
        throw new Error("Promise should have been rejected");
      },
      () => {
        // Expected rejection
      }
    );
  });
});