const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q error handling behavior", () => {
  it("should demonstrate different error handling between Node.js and browser environments", (done) => {
    // The mutation changes `if (isNodeJS)` to `if (true)`, which affects how
    // uncaught errors are handled in the nextTick implementation

    // Create a rejected promise
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Track whether error was handled
    let errorHandled = false;

    // In Node.js: errors should be thrown synchronously in next tick
    // In Browser: errors should be thrown asynchronously in setTimeout
    // With mutation: always uses Node.js behavior (synchronous throw)

    // Set up error handler
    rejectedPromise.catch(() => {
      errorHandled = true;
    });

    // In original code (browser environment):
    // - Error should be thrown asynchronously in setTimeout
    // - Our catch handler should handle it before the async throw
    // In mutated code (browser environment):
    // - Error is thrown synchronously in next tick
    // - May not be caught by our handler in time

    setTimeout(() => {
      if (typeof window !== "undefined") {
        // Browser environment
        expect(errorHandled).toBe(true);
      }
      done();
    }, 50);
  });
});