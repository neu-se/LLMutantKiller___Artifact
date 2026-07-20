// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
  it("should not call process.emit when it's not a function", () => {
    // Save the original process.emit
    const originalEmit = process.emit;
    let errorCaught = false;

    // Mock process.emit to be undefined (not a function)
    process.emit = undefined;

    // Reset unhandled rejections tracking
    Q.resetUnhandledRejections();

    // Create a rejected promise that won't be handled
    const rejectedPromise = Q.reject(new Error("test error"));

    // In the original code, this should not throw an error
    // In the mutated code, it will try to call process.emit which is undefined
    return Q.delay(50)
      .then(() => {
        // Restore process.emit
        process.emit = originalEmit;
        // If we reach here without error, the original code is working correctly
        expect(true).toBe(true);
      })
      .catch((error) => {
        // Restore process.emit
        process.emit = originalEmit;
        // If we get here, the mutated code tried to call undefined
        errorCaught = true;
        throw error;
      });
  });
});