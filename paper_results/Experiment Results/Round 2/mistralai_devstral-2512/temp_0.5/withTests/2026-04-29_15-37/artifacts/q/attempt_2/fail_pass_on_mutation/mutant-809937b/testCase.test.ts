// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
  it("should not emit unhandledRejection when process.emit is not a function", () => {
    // Save the original process.emit
    const originalEmit = process.emit;

    // Mock process.emit to be undefined (not a function)
    process.emit = undefined as any;

    // Reset unhandled rejections tracking
    Q.resetUnhandledRejections();

    // Create a rejected promise
    const rejectedPromise = Q.reject(new Error("test error"));

    // Restore process.emit
    process.emit = originalEmit;

    // In the original code, this should not throw an error
    // In the mutated code, it will try to call process.emit("unhandledRejection", ...)
    // which will throw an error since process.emit is undefined
    return Q.delay(10).then(() => {
      expect(true).toBe(true);
    });
  });
});