const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q error handling behavior", () => {
  it("should handle uncaught promise rejections differently in Node.js vs browser", (done) => {
    // The mutation changes `if (isNodeJS)` to `if (true)`, affecting how
    // uncaught errors are re-thrown in the nextTick implementation

    // Create a rejected promise without a catch handler
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Track if error was thrown
    let errorThrown = false;

    // In Node.js: errors are thrown synchronously in next tick
    // In Browser: errors are thrown asynchronously in setTimeout
    // With mutation: always uses Node.js behavior (synchronous throw)

    // Try to catch the error
    try {
      // Force the promise to be processed
      rejectedPromise.then(() => {}, () => {
        // This should handle the rejection
      });
    } catch (e) {
      errorThrown = true;
    }

    // In original code (browser environment):
    // - Error should be thrown asynchronously (not caught here)
    // - errorThrown should remain false
    // In mutated code (browser environment):
    // - Error is thrown synchronously
    // - errorThrown should be true

    setTimeout(() => {
      if (typeof window !== "undefined") {
        // Browser environment
        expect(errorThrown).toBe(false);
      } else {
        // Node.js environment
        expect(errorThrown).toBe(true);
      }
      done();
    }, 10);
  });
});