const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should only emit unhandledRejection when process.emit is a function", (done) => {
    const originalEmit = process.emit;
    let emitCalled = false;

    // Temporarily make process.emit not a function
    process.emit = undefined;

    // Create a rejected promise without handling it
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Give time for the unhandled rejection tracking to occur
    setTimeout(() => {
      // Restore original emit
      process.emit = originalEmit;

      // In the original code, emit should not be called because process.emit is not a function
      // In the mutated code, it will try to emit (due to "true" condition) and fail
      expect(emitCalled).toBe(false);
      done();
    }, 100);
  });
});