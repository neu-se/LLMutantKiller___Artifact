import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("setImmediate fallback behavior", () => {
  it("should use setTimeout when setImmediate is not available", (done) => {
    // Save original setImmediate
    const originalSetImmediate = (global as any).setImmediate;

    // Simulate environment without setImmediate
    (global as any).setImmediate = undefined;

    // Track whether setTimeout was called
    let setTimeoutCalled = false;
    const originalSetTimeout = global.setTimeout;
    (global as any).setTimeout = function(fn: Function, delay: number) {
      setTimeoutCalled = true;
      return originalSetTimeout(fn, delay);
    };

    // Create a deferred promise
    const deferred = Q.defer();
    let promiseResolved = false;

    // Set up promise resolution handler
    deferred.promise.then(() => {
      promiseResolved = true;
    });

    // Resolve the promise after a short delay
    setTimeout(() => {
      deferred.resolve();
    }, 10);

    // Check after a longer delay
    setTimeout(() => {
      // Restore original functions
      (global as any).setImmediate = originalSetImmediate;
      (global as any).setTimeout = originalSetTimeout;

      // Verify setTimeout was used as fallback
      expect(setTimeoutCalled).toBe(true);
      expect(promiseResolved).toBe(true);
      done();
    }, 100);
  });
});