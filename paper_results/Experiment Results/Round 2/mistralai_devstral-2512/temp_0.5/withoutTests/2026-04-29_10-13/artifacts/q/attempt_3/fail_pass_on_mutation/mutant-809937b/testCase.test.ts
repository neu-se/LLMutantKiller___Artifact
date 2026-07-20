// Test case to detect the mutation in the unhandled rejection tracking logic
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Unhandled rejection tracking", () => {
  it("should emit unhandledRejection when process.emit is a function", (done) => {
    // Save the original process.emit
    const originalEmit = process.emit;

    // Track if unhandledRejection was emitted
    let unhandledRejectionEmitted = false;

    // Mock process.emit to track calls
    process.emit = function(event: string, ...args: any[]) {
      if (event === "unhandledRejection") {
        unhandledRejectionEmitted = true;
      }
      return originalEmit.apply(process, [event, ...args]);
    } as any;

    // Create a rejected promise that should trigger unhandledRejection
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Give time for the unhandled rejection tracking to occur
    setTimeout(() => {
      // Restore the original process.emit
      process.emit = originalEmit;

      // The test should pass if unhandledRejection was emitted
      // (which will fail on mutated code where the condition is always true)
      if (unhandledRejectionEmitted) {
        done();
      } else {
        done(new Error("unhandledRejection was not emitted"));
      }
    }, 50);
  });
});