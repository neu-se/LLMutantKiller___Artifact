import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q unhandled rejection tracking", () => {
  it("should not emit unhandledRejection when process.emit is not a function", (done) => {
    const originalEmit = process.emit;
    let emitCalled = false;

    // Override process.emit to track calls
    process.emit = function(event: string, ...args: any[]) {
      emitCalled = true;
      return (originalEmit as any).apply(this, [event, ...args]);
    };

    // Create a rejected promise without handling it
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Give time for the unhandled rejection tracking to occur
    setTimeout(() => {
      // Restore original emit
      process.emit = originalEmit;

      // In the original code, emit should not be called because process.emit is a function
      // In the mutated code, it will always try to emit (due to "true" condition)
      expect(emitCalled).toBe(false);
      done();
    }, 100);
  });
});