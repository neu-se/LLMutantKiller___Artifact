import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("setImmediate availability check", () => {
  it("should correctly detect when setImmediate is not available", (done) => {
    // Save original setImmediate
    const originalSetImmediate = (global as any).setImmediate;

    // Simulate environment without setImmediate
    (global as any).setImmediate = undefined;

    // Track execution order
    const executionOrder: string[] = [];
    let setTimeoutUsed = false;

    // Override setTimeout to track its usage
    const originalSetTimeout = global.setTimeout;
    (global as any).setTimeout = function(fn: Function, delay: number) {
      setTimeoutUsed = true;
      return originalSetTimeout(() => {
        executionOrder.push('setTimeout');
        fn();
      }, delay);
    };

    // Create a promise that will trigger the async mechanism
    const deferred = Q.defer();
    executionOrder.push('beforeResolve');

    deferred.promise.then(() => {
      executionOrder.push('promiseResolved');
    });

    // Force the promise to resolve
    deferred.resolve();
    executionOrder.push('afterResolve');

    // Check after a delay
    setTimeout(() => {
      // Restore original functions
      (global as any).setImmediate = originalSetImmediate;
      (global as any).setTimeout = originalSetTimeout;

      // With original code: should use setTimeout as fallback
      // With mutated code: would incorrectly try to use setImmediate (which doesn't exist)
      expect(setTimeoutUsed).toBe(true);
      expect(executionOrder).toEqual([
        'beforeResolve',
        'afterResolve',
        'setTimeout',
        'promiseResolved'
      ]);
      done();
    }, 50);
  });
});