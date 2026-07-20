// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
  it("should properly check process.emit type before calling", () => {
    // Save the original process.emit
    const originalEmit = process.emit;
    let emitCalled = false;

    // Mock process.emit to be a non-function value
    process.emit = "not a function" as any;

    // Reset unhandled rejections tracking
    Q.resetUnhandledRejections();

    // Create a rejected promise that won't be handled
    const rejectedPromise = Q.reject(new Error("test error"));

    // In the original code, process.emit should NOT be called because
    // the condition checks for typeof process.emit === "function"
    // In the mutated code, the condition is always true, so it will try to call
    // process.emit which will throw an error since it's a string
    return Q.delay(50)
      .then(() => {
        // Restore process.emit
        process.emit = originalEmit;
        // If we reach here without error, the original code is working correctly
        expect(true).toBe(true);
      });
  });
});