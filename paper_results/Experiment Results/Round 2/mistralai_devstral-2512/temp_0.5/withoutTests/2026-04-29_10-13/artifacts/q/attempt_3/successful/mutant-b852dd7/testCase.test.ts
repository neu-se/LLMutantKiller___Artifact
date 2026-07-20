const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q unhandled rejection tracking", () => {
  it("should not emit unhandledRejection when process.emit is not a function", (done) => {
    // Save the original process.emit
    const originalEmit = process.emit;

    // Mock process.emit to be undefined
    process.emit = undefined as any;

    // Create a promise that will be rejected but not handled
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Give some time for the unhandled rejection tracking to occur
    setTimeout(() => {
      // Restore the original process.emit
      process.emit = originalEmit;

      // The test passes if no error was thrown (no unhandledRejection event was emitted)
      done();
    }, 100);
  });
});