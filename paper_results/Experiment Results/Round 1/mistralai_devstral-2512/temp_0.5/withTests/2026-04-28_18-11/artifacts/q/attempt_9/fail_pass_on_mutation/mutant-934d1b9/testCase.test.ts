// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("defer mutation test", () => {
  it("should prevent re-resolution of already resolved deferred", async () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    const results: number[] = [];

    // First resolution
    deferred.resolve(10);

    // Second resolution attempt with different value
    deferred.resolve(20);

    // Add callback after both resolution attempts
    promise.then(value => results.push(value));

    // Wait for callback to execute
    await Q.delay(10);

    // In original code, should only get first value
    // In mutated code, might get second value due to bypassed check
    expect(results).toEqual([10]);
    expect(results).not.toContain(20);
  });
});