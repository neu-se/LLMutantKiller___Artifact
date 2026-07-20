// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("defer mutation test", () => {
  it("should properly handle deferred resolution state", async () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Resolve the deferred
    deferred.resolve(42);

    // Try to resolve again - should be ignored in original code
    deferred.resolve(99);

    // The promise should be fulfilled with the first value
    const result = await promise;
    expect(result).toBe(42);

    // Verify the promise is actually fulfilled
    expect(promise.isFulfilled()).toBe(true);
    expect(promise.isPending()).toBe(false);
  });
});