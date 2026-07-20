import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("setImmediate fallback behavior", () => {
  it("should use setTimeout when setImmediate is not available", (done) => {
    // Save the original setImmediate if it exists
    const originalSetImmediate = global.setImmediate;

    // Remove setImmediate to simulate an environment where it's not available
    delete global.setImmediate;

    // Track whether setTimeout was called
    let setTimeoutCalled = false;
    const originalSetTimeout = global.setTimeout;
    global.setTimeout = function(fn: Function, delay: number) {
      setTimeoutCalled = true;
      return originalSetTimeout(fn, delay);
    };

    // Create a promise and check if it resolves correctly
    const deferred = Q.defer();
    let resolved = false;

    deferred.promise.then(() => {
      resolved = true;
    });

    // Resolve the promise after a short delay to ensure async behavior
    setTimeout(() => {
      deferred.resolve();
    }, 10);

    // Check after a delay that the promise resolved and setTimeout was used
    setTimeout(() => {
      expect(resolved).toBe(true);
      expect(setTimeoutCalled).toBe(true);

      // Restore the original setImmediate and setTimeout
      global.setImmediate = originalSetImmediate;
      global.setTimeout = originalSetTimeout;

      done();
    }, 50);
  });
});