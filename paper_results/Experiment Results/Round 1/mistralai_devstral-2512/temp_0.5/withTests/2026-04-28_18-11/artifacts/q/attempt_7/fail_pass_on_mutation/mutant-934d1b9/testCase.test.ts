// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("defer mutation test", () => {
  it("should prevent multiple resolutions when deferred is already resolved", async () => {
    const deferred = Q.defer();
    let callbackCount = 0;

    deferred.promise.then(() => {
      callbackCount++;
    });

    // First resolution
    deferred.resolve(10);

    // Second resolution attempt - should be ignored in original code
    deferred.resolve(20);

    // Add another callback after both resolution attempts
    deferred.promise.then(() => {
      callbackCount++;
    });

    // Wait for all callbacks to execute
    await Q.delay(10);

    // In original code, both callbacks should be called exactly once
    // In mutated code, the behavior might differ due to the bypassed check
    expect(callbackCount).toBe(2);
  });
});