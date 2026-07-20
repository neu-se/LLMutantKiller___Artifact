// Test case to detect the mutation in the unhandled rejection tracking logic
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Unhandled rejection tracking", () => {
  it("should not emit unhandledRejection when process.emit is not a function", (done) => {
    // Save the original process.emit
    const originalEmit = process.emit;

    // Mock process.emit to be undefined (not a function)
    process.emit = undefined as any;

    // Create a rejected promise that should NOT trigger unhandledRejection
    // because process.emit is not a function
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Give time for the unhandled rejection tracking to occur
    setTimeout(() => {
      // Restore the original process.emit
      process.emit = originalEmit;

      // The test passes if no unhandledRejection event was emitted
      // (which would have thrown an error if the mutation was present)
      done();
    }, 50);
  });
});