// Test case to detect the mutation in q.js where setImmediate check is replaced with false
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("setImmediate fallback detection", () => {
  it("should use setImmediate when available for scheduling", (done) => {
    // This test verifies that Q uses setImmediate when available
    // The mutation changes the condition to 'false', which would prevent setImmediate from being used

    // Store original setImmediate
    const originalSetImmediate = global.setImmediate;
    let setImmediateUsed = false;

    // Override setImmediate to detect if it's called
    global.setImmediate = function(callback: (...args: any[]) => void) {
      setImmediateUsed = true;
      return originalSetImmediate(callback);
    };

    // Create a promise that will trigger scheduling
    const promise = Q.resolve();

    // Chain a then to ensure scheduling occurs
    promise.then(() => {
      // Restore original setImmediate
      global.setImmediate = originalSetImmediate;

      // In the original code, setImmediate should be used if available
      // In the mutated code, it won't be used because the condition is always false
      expect(setImmediateUsed).toBe(true);
      done();
    });
  });
});