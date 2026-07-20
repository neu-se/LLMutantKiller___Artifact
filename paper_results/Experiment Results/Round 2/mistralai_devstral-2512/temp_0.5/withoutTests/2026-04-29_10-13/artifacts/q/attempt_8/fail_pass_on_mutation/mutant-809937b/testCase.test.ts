// Test case to detect the mutation in the unhandled rejection tracking logic
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Unhandled rejection tracking", () => {
  it("should correctly handle process.emit type checking", (done) => {
    // Save the original process.emit
    const originalEmit = process.emit;

    // Test with process.emit being a non-function value
    process.emit = "not a function" as any;

    // Create a rejected promise
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Give time for the unhandled rejection tracking to occur
    setTimeout(() => {
      // Restore the original process.emit
      process.emit = originalEmit;

      // The test passes if no error was thrown
      // (which would happen in mutated code when trying to call a string as function)
      done();
    }, 50);
  });
});