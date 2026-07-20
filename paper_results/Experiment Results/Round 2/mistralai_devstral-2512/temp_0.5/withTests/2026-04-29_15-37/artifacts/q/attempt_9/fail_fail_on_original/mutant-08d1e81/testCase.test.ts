// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should handle unhandled rejections when process is available but not an object", () => {
    // Save original process
    const originalProcess = global.process;

    // Set process to a non-object value
    global.process = "not an object" as any;

    try {
      // Create a rejected promise
      const rejectedPromise = Q.reject(new Error("test error"));

      // In the original code, this should work fine since it checks typeof process === "object"
      // In the mutated code, it will try to access process.emit even when process is not an object
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