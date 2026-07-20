// Test case to detect the mutation in q.js where `typeof setImmediate === "function"` is replaced with `false`
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("setImmediate fallback detection", () => {
  it("should use setImmediate when available for scheduling tasks", (done) => {
    // This test verifies that Q uses setImmediate when it's available
    // The mutation changes the condition to `false`, which would prevent setImmediate from being used

    // Store original setImmediate
    const originalSetImmediate = global.setImmediate;
    let setImmediateUsed = false;

    // Override setImmediate to track its usage
    global.setImmediate = function(callback: (...args: any[]) => void) {
      setImmediateUsed = true;
      return originalSetImmediate(callback);
    };

    // Create a promise that will trigger scheduling
    const deferred = Q.defer();
    let resolved = false;

    deferred.promise.then(() => {
      resolved = true;
    });

    // Force scheduling by resolving after a short delay
    setTimeout(() => {
      deferred.resolve(42);

      // Check if setImmediate was used
      setTimeout(() => {
        global.setImmediate = originalSetImmediate;
        expect(setImmediateUsed).toBe(true);
        expect(resolved).toBe(true);
        done();
      }, 100);
    }, 50);
  });
});