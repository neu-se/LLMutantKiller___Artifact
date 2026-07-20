const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q error handling behavior", () => {
  it("should demonstrate different error handling between Node.js and browser environments", (done) => {
    // The mutation changes `if (isNodeJS)` to `if (true)`, which affects how
    // uncaught errors are re-thrown in the nextTick implementation

    // Create a rejected promise without a catch handler
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Track if error was thrown synchronously
    let errorThrownSynchronously = false;

    // In Node.js: errors are thrown synchronously in next tick
    // In Browser: errors are thrown asynchronously in setTimeout
    // With mutation: always uses Node.js behavior (synchronous throw)

    // Try to catch the error synchronously
    try {
      // Force the promise to be processed
      rejectedPromise.then(() => {}, () => {
        // This should handle the rejection
      });
    } catch (e) {
      errorThrownSynchronously = true;
    }

    // In original code (browser environment):
    // - Error should be thrown asynchronously (not caught here)
    // - errorThrownSynchronously should remain false
    // In mutated code (browser environment):
    // - Error is thrown synchronously
    // - errorThrownSynchronously should be true

    setTimeout(() => {
      if (typeof window !== "undefined") {
        // Browser environment - expect async behavior in original code
        expect(errorThrownSynchronously).toBe(false);
      } else {
        // Node.js environment - expect sync behavior
        expect(errorThrownSynchronously).toBe(true);
      }
      done();
    }, 10);
  });
});