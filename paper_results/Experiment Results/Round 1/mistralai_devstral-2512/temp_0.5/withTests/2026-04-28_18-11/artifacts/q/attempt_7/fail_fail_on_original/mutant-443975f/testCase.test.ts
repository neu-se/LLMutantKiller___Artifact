// Test case to detect the mutation in q.js where setImmediate check is replaced with false
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("setImmediate fallback detection", () => {
  it("should use setImmediate when available for scheduling", () => {
    // This test verifies that Q uses setImmediate when available
    // The mutation changes the condition to 'false', which would prevent setImmediate from being used

    // Track execution order to detect which scheduling method is used
    const executionOrder: string[] = [];

    // Override setImmediate to track its usage
    const originalSetImmediate = global.setImmediate;
    global.setImmediate = function(callback: (...args: any[]) => void) {
      executionOrder.push("setImmediate");
      return originalSetImmediate(() => {
        executionOrder.push("setImmediate-callback");
        callback();
      });
    };

    // Override setTimeout to track its usage
    const originalSetTimeout = global.setTimeout;
    global.setTimeout = function(callback: (...args: any[]) => void, timeout?: number) {
      executionOrder.push(`setTimeout-${timeout}`);
      return originalSetTimeout(() => {
        executionOrder.push(`setTimeout-${timeout}-callback`);
        callback();
      }, timeout);
    };

    // Create and resolve a promise to trigger scheduling
    const deferred = Q.defer();
    let promiseResolved = false;

    deferred.promise.then(() => {
      promiseResolved = true;
      executionOrder.push("promise-resolved");
    });

    // Resolve the deferred
    deferred.resolve(42);

    // Restore original methods
    global.setImmediate = originalSetImmediate;
    global.setTimeout = originalSetTimeout;

    // In the original code with setImmediate available, it should use setImmediate
    // In the mutated code, it will fall back to setTimeout(flush, 0)
    expect(executionOrder).toContain("setImmediate");
    expect(promiseResolved).toBe(true);
  });
});