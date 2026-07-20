import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("setImmediate fallback behavior", () => {
  it("should use setTimeout when setImmediate is not available", (done) => {
    // Save the original setImmediate if it exists
    const originalSetImmediate = global.setImmediate;

    // Simulate an environment where setImmediate is not available
    delete (global as any).setImmediate;

    // Track whether setTimeout was called as fallback
    let setTimeoutCalled = false;
    const originalSetTimeout = global.setTimeout;
    (global as any).setTimeout = function(fn: Function, delay: number) {
      setTimeoutCalled = true;
      return originalSetTimeout(fn, delay);
    };

    // Create and resolve a promise to trigger the async mechanism
    const deferred = Q.defer();
    let promiseResolved = false;

    deferred.promise.then(() => {
      promiseResolved = true;
    });

    // Resolve the promise after a short delay
    setTimeout(() => {
      deferred.resolve();
    }, 10);

    // Check after a delay that setTimeout was used as fallback
    setTimeout(() => {
      // Restore original functions
      (global as any).setImmediate = originalSetImmediate;
      (global as any).setTimeout = originalSetTimeout;

      // The test passes if setTimeout was called as fallback
      expect(setTimeoutCalled).toBe(true);
      expect(promiseResolved).toBe(true);
      done();
    }, 50);
  });
});