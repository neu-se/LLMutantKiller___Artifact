// Test case to detect the mutation in q.js where `typeof setImmediate === "function"` is replaced with `false`
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("setImmediate fallback detection", () => {
  it("should use setImmediate when available for scheduling tasks", (done) => {
    // This test verifies that Q uses setImmediate when it's available
    // The mutation changes the condition to `false`, which would prevent setImmediate from being used

    // Create a spy to track which scheduling mechanism is used
    const originalSetImmediate = global.setImmediate;
    let setImmediateUsed = false;

    // Override setImmediate to track its usage
    global.setImmediate = function(callback: (...args: any[]) => void, ...args: any[]) {
      setImmediateUsed = true;
      return originalSetImmediate(callback, ...args);
    };

    // Force Q to re-evaluate its scheduling mechanism
    // We need to create a new promise to trigger the scheduling logic
    const deferred = Q.defer();
    let resolved = false;

    deferred.promise.then(() => {
      resolved = true;
    });

    // Resolve the deferred in the next tick to ensure scheduling is tested
    setTimeout(() => {
      deferred.resolve(42);

      // Give some time for the promise to resolve
      setTimeout(() => {
        // Restore the original setImmediate
        global.setImmediate = originalSetImmediate;

        // In the original code, setImmediate should be used if available
        // In the mutated code, it won't be used because the condition is always false
        expect(setImmediateUsed).toBe(true);
        expect(resolved).toBe(true);
        done();
      }, 50);
    }, 10);
  });
});