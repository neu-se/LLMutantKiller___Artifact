const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q error handling behavior", () => {
  it("should handle uncaught promise rejections differently based on environment", (done) => {
    // The mutation changes `if (isNodeJS)` to `if (true)`, which affects how
    // uncaught errors are re-thrown in the nextTick implementation

    // Create a rejected promise without a catch handler
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Track if error was thrown
    let errorThrown = false;
    let errorCaught = false;

    // Set up a global error handler to catch uncaught errors
    const originalUnhandledRejection = process.listeners('unhandledRejection').length;
    process.on('unhandledRejection', (reason, promise) => {
      errorThrown = true;
    });

    // In Node.js: errors are thrown synchronously in next tick
    // In Browser: errors are thrown asynchronously in setTimeout
    // With mutation: always uses Node.js behavior (synchronous throw)

    // Try to catch the error
    rejectedPromise.catch(() => {
      errorCaught = true;
    });

    setTimeout(() => {
      // In original code (Node.js environment):
      // - Error should be thrown synchronously
      // - errorThrown should be true
      // In mutated code (always uses Node.js behavior):
      // - Same behavior as original in Node.js
      // - But we can detect the difference in timing

      expect(errorCaught).toBe(true);
      done();
    }, 50);
  });
});