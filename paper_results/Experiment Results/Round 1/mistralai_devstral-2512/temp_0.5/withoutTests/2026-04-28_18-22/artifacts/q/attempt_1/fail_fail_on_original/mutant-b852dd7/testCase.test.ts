import { Q } from "./q";

describe("Q unhandled rejection tracking", () => {
  it("should not emit unhandledRejection when process.emit is not a function", (done) => {
    const originalEmit = process.emit;
    let emitCalled = false;

    // Override process.emit to track calls
    process.emit = function(...args) {
      emitCalled = true;
      return originalEmit.apply(this, args);
    };

    // Create a rejected promise without handling it
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Give time for the unhandled rejection tracking to occur
    setTimeout(() => {
      // Restore original emit
      process.emit = originalEmit;

      // The emit should not have been called because process.emit is not a function in the mutated code
      // In the original code, it would only emit if process.emit is a function
      // In the mutated code, it will always try to emit (due to "true" condition)
      // But since we've overridden emit, we can detect if it was called
      expect(emitCalled).toBe(false);
      done();
    }, 100);
  });
});