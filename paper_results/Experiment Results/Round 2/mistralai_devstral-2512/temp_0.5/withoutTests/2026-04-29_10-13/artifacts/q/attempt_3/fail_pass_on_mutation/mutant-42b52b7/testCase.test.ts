const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should emit unhandledRejection event when process.emit is available", (done) => {
    // Track if unhandledRejection event was emitted
    let unhandledRejectionEmitted = false;

    // Override process.emit to track unhandledRejection events
    const originalEmit = process.emit;
    process.emit = function(event: string, ...args: any[]) {
      if (event === "unhandledRejection") {
        unhandledRejectionEmitted = true;
      }
      return originalEmit.apply(process, [event, ...args]);
    };

    // Create a rejected promise that won't be handled
    const rejectedPromise = Q.reject(new Error("Test rejection"));

    // Wait for the event loop to process the unhandled rejection
    setTimeout(() => {
      // Restore original emit
      process.emit = originalEmit;

      // The test should pass if unhandledRejection was emitted
      expect(unhandledRejectionEmitted).toBe(true);
      done();
    }, 50);
  });
});