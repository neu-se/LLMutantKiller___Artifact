// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
  it("should not call process.emit when it's not a function", () => {
    // Save the original process.emit
    const originalEmit = process.emit;
    let emitCalled = false;

    // Mock process.emit to be a non-function value
    process.emit = undefined as any;

    // Reset unhandled rejections tracking
    Q.resetUnhandledRejections();

    // Create a rejected promise that won't be handled
    const rejectedPromise = Q.reject(new Error("test error"));

    // In the original code, process.emit should NOT be called because
    // the condition checks for typeof process.emit === "function"
    // In the mutated code, the condition is always true, so it will try to call
    // process.emit which will throw an error
    return Q.delay(50).then(() => {
      // Restore process.emit
      process.emit = originalEmit;

      // The test passes if we reach here without errors
      expect(true).toBe(true);
    });
  });
});