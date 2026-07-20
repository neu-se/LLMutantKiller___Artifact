// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("defer mutation test", () => {
  it("should properly handle deferred resolution state", async () => {
    const deferred = Q.defer();
    const results: number[] = [];

    // Add multiple callbacks to track resolution
    deferred.promise.then(value => results.push(value));
    deferred.promise.then(value => results.push(value));

    // First resolution
    deferred.resolve(10);

    // Second resolution with different value - should be ignored in original code
    deferred.resolve(20);

    // Wait for all callbacks to execute
    await Q.delay(10);

    // In original code, all callbacks should receive the first value (10)
    // In mutated code, some callbacks might receive the second value (20)
    expect(results).toEqual([10, 10]);
  });
});