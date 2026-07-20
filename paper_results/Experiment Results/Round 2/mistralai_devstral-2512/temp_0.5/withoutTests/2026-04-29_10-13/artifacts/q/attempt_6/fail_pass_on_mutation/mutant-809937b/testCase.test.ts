// Test case to detect the mutation in the unhandled rejection tracking logic
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Unhandled rejection tracking", () => {
  it("should handle rejected promises correctly when process.emit is not a function", (done) => {
    // Save the original process.emit
    const originalEmit = process.emit;

    // Set process.emit to undefined (not a function)
    process.emit = undefined as any;

    // Create a rejected promise
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Add a handler after a delay to ensure the rejection is tracked
    setTimeout(() => {
      rejectedPromise.catch(() => {
        // Restore the original process.emit
        process.emit = originalEmit;
        done();
      });
    }, 10);
  });
});