import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("setImmediate availability check", () => {
  it("should correctly detect when setImmediate is not available", (done) => {
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

    // Create a promise that will trigger the async mechanism
    const deferred = Q.defer();
    let resolved = false;

    deferred.promise.then(() => {
      resolved = true;
    });

    // Force the promise to resolve
    deferred.resolve();

    // Check after a delay
    setTimeout(() => {
      // Restore original functions
      (global as any).setImmediate = originalSetImmediate;
      (global as any).setTimeout = originalSetTimeout;

      // With original code: should use setTimeout as fallback
      // With mutated code: would incorrectly try to use setImmediate (which doesn't exist)
      expect(setTimeoutCalled).toBe(true);
      expect(resolved).toBe(true);
      done();
    }, 50);
  });
});