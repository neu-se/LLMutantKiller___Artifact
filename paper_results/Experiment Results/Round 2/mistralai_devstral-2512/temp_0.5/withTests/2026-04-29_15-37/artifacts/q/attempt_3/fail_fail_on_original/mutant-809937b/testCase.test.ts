// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
  it("should handle unhandled rejections correctly when process.emit is not a function", () => {
    // Save the original process.emit
    const originalEmit = process.emit;
    let emitCalled = false;

    // Mock process.emit to track if it's called
    process.emit = function(event: string, ...args: any[]) {
      emitCalled = true;
      return originalEmit?.apply(process, [event, ...args]);
    };

    // Reset unhandled rejections tracking
    Q.resetUnhandledRejections();

    // Create a rejected promise that won't be handled
    const rejectedPromise = Q.reject(new Error("test error"));

    // In the original code, process.emit should NOT be called because
    // the condition checks for typeof process.emit === "function"
    // In the mutated code, the condition is always true, so process.emit will be called
    return Q.delay(50).then(() => {
      // Restore process.emit
      process.emit = originalEmit;

      // In original code: emitCalled should be false
      // In mutated code: emitCalled should be true
      expect(emitCalled).toBe(false);
    });
  });
});