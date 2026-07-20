// Test case to detect the mutation in q.js where setImmediate check is replaced with false
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("setImmediate fallback detection", () => {
  it("should schedule tasks using the most efficient available method", () => {
    // This test verifies that Q uses the most efficient scheduling method available
    // The mutation changes the setImmediate check to 'false', forcing fallback to setTimeout

    // Track which scheduling method was used
    let schedulingMethod: string | null = null;

    // Override scheduling methods to detect which one is used
    const originalSetImmediate = global.setImmediate;
    const originalSetTimeout = global.setTimeout;

    global.setImmediate = function(callback: (...args: any[]) => void) {
      schedulingMethod = "setImmediate";
      return originalSetImmediate(callback);
    };

    global.setTimeout = function(callback: (...args: any[]) => void, timeout?: number) {
      if (timeout === 0) {
        schedulingMethod = "setTimeout";
      }
      return originalSetTimeout(callback, timeout);
    };

    // Create and resolve a promise to trigger scheduling
    const deferred = Q.defer();
    let promiseResolved = false;

    deferred.promise.then(() => {
      promiseResolved = true;
    });

    // Resolve the deferred
    deferred.resolve(42);

    // Restore original methods
    global.setImmediate = originalSetImmediate;
    global.setTimeout = originalSetTimeout;

    // In the original code with setImmediate available, it should use setImmediate
    // In the mutated code, it will fall back to setTimeout
    expect(schedulingMethod).toBe("setImmediate");
    expect(promiseResolved).toBe(true);
  });
});