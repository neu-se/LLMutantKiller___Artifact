// Test case to detect the mutation in the unhandled rejection tracking logic
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Unhandled rejection tracking", () => {
  it("should not throw when process.emit is not a function", (done) => {
    // Save the original process.emit
    const originalEmit = process.emit;

    // Set process.emit to a non-function value
    process.emit = 123 as any;

    // Create a rejected promise
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Give time for the unhandled rejection tracking to occur
    setTimeout(() => {
      // Restore the original process.emit
      process.emit = originalEmit;

      // The test passes if no error was thrown
      done();
    }, 50);
  });
});