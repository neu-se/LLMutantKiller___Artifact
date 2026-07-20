// Test case to detect the mutation in q.js where setImmediate check is replaced with false
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("setImmediate fallback detection", () => {
  it("should use setImmediate when available for scheduling", () => {
    // This test verifies that Q uses setImmediate when available
    // The mutation changes the condition to 'false', which would prevent setImmediate from being used

    // Create a promise that will trigger scheduling
    const deferred = Q.defer();
    let resolved = false;

    deferred.promise.then(() => {
      resolved = true;
    });

    // Resolve the deferred
    deferred.resolve(42);

    // The promise should be resolved
    expect(resolved).toBe(true);

    // Now test the scheduling behavior by checking if setImmediate is used
    // We'll use a more indirect approach by measuring performance
    // setImmediate should be faster than setTimeout in Node.js

    let executionTime: number | null = null;
    const startTime = Date.now();

    return Q.resolve().then(() => {
      executionTime = Date.now() - startTime;

      // In the original code with setImmediate available, execution should be very fast (< 10ms)
      // In the mutated code using setTimeout, it might be slightly slower
      // This is a probabilistic check but should work in most cases
      if (executionTime !== null) {
        expect(executionTime).toBeLessThan(10);
      }
      return true;
    });
  });
});