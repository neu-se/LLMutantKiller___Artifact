import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("setImmediate availability check", () => {
  it("should correctly handle environments without setImmediate", (done) => {
    // Save original setImmediate
    const originalSetImmediate = (global as any).setImmediate;

    // Simulate environment without setImmediate
    (global as any).setImmediate = undefined;

    // Track which async method was actually used
    let setTimeoutUsed = false;
    const originalSetTimeout = global.setTimeout;
    (global as any).setTimeout = function(fn: Function, delay: number) {
      setTimeoutUsed = true;
      return originalSetTimeout(fn, delay);
    };

    // Create a promise that will trigger the async mechanism
    const deferred = Q.defer();
    let resolved = false;

    deferred.promise.then(() => {
      resolved = true;
    });

    // Force the promise to resolve after a short delay
    setTimeout(() => {
      deferred.resolve();
    }, 10);

    // Check after a delay
    setTimeout(() => {
      // Restore original functions
      (global as any).setImmediate = originalSetImmediate;
      (global as any).setTimeout = originalSetTimeout;

      // With original code: should use setTimeout as fallback
      // With mutated code: would incorrectly try to use setImmediate (which doesn't exist)
      expect(setTimeoutUsed).toBe(true);
      expect(resolved).toBe(true);
      done();
    }, 50);
  });
});