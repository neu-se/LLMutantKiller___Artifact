const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q error handling behavior", () => {
  it("should demonstrate different error handling timing between environments", (done) => {
    // The mutation changes `if (isNodeJS)` to `if (true)`, which affects how
    // uncaught errors are re-thrown in the nextTick implementation

    // Create a rejected promise without immediate catch
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Track execution order and timing
    const executionOrder: string[] = [];
    const executionTimes: number[] = [];
    let errorCaught = false;
    let uncaughtError = false;

    // Set up global error handler
    process.on('unhandledRejection', () => {
      uncaughtError = true;
    });

    // This should execute in next tick
    rejectedPromise.catch(() => {
      executionOrder.push('catch');
      executionTimes.push(Date.now());
      errorCaught = true;
    });

    // This should execute after the error handling
    setTimeout(() => {
      executionOrder.push('timeout');
      executionTimes.push(Date.now());

      // In original code (Node.js environment):
      // - Error thrown synchronously in next tick
      // - uncaughtError should be true
      // In mutated code (always uses Node.js behavior):
      // - Same behavior as original in Node.js
      // - But we can detect the difference in browser environment

      if (typeof window !== "undefined") {
        // Browser environment - expect async behavior in original code
        expect(executionOrder).toEqual(['catch', 'timeout']);
        expect(uncaughtError).toBe(false);
      } else {
        // Node.js environment
        expect(uncaughtError).toBe(true);
      }
      expect(errorCaught).toBe(true);
      done();
    }, 10);
  });
});