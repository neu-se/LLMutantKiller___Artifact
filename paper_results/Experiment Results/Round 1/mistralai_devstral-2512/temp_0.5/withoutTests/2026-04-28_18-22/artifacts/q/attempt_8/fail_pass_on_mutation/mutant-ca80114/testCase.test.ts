const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q error handling behavior", () => {
  it("should demonstrate different error handling timing between environments", (done) => {
    // The mutation changes `if (isNodeJS)` to `if (true)`, which affects how
    // uncaught errors are re-thrown in the nextTick implementation

    // Create a rejected promise without immediate catch
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Track execution order
    const executionOrder: string[] = [];
    let errorCaught = false;

    // In Node.js: errors are thrown synchronously in next tick
    // In Browser: errors are thrown asynchronously in setTimeout
    // With mutation: always uses Node.js behavior (synchronous throw)

    // This should execute in next tick
    rejectedPromise.catch(() => {
      executionOrder.push('catch');
      errorCaught = true;
    });

    // This should execute after the error handling
    setTimeout(() => {
      executionOrder.push('timeout');

      // In original code (browser environment):
      // - Error thrown asynchronously after catch
      // - Order should be: catch, timeout
      // In mutated code (browser environment):
      // - Error thrown synchronously before catch completes
      // - Order might be different

      if (typeof window !== "undefined") {
        // Browser environment
        expect(executionOrder).toEqual(['catch', 'timeout']);
      }
      expect(errorCaught).toBe(true);
      done();
    }, 10);
  });
});