// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("defer mutation test", () => {
  it("should maintain resolvedPromise state correctly", async () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Resolve the deferred
    deferred.resolve(42);

    // The mutation changes the condition from `if (resolvedPromise)` to `if (false)`
    // This means the resolvedPromise check is bypassed, allowing multiple resolutions
    // We test this by checking the internal state through the promise's behavior

    // Try to resolve again - in original code this should be ignored
    // In mutated code, this might cause unexpected behavior
    deferred.resolve(99);

    // Wait for any async operations
    await Q.delay(10);

    // The promise should still have the first resolved value
    const result = await promise;
    expect(result).toBe(42);

    // Verify the promise state
    expect(promise.isFulfilled()).toBe(true);
    expect(promise.isPending()).toBe(false);
  });
});