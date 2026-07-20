// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("defer mutation test", () => {
  it("should prevent re-resolution of already resolved deferred", async () => {
    const deferred = Q.defer();
    let firstCallbackCalled = false;
    let secondCallbackCalled = false;

    deferred.promise.then(value => {
      firstCallbackCalled = true;
      expect(value).toBe(10);
    });

    // First resolution
    deferred.resolve(10);

    // Second resolution attempt with different value
    deferred.resolve(20);

    // Add another callback after resolution attempts
    deferred.promise.then(value => {
      secondCallbackCalled = true;
      expect(value).toBe(10);
    });

    // Wait for all callbacks to execute
    await Q.delay(10);

    // Both callbacks should be called with the first value
    expect(firstCallbackCalled).toBe(true);
    expect(secondCallbackCalled).toBe(true);
  });
});