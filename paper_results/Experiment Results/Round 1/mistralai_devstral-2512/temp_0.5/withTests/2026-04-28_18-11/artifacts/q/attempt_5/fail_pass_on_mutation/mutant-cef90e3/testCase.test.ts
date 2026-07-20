import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.then behavior", () => {
  it("should correctly handle done flag in promise resolution", async () => {
    const deferred = Q.defer();
    let callCount = 0;

    const promise = deferred.promise.then(() => {
      callCount++;
      return callCount;
    });

    // Resolve the promise
    deferred.resolve(42);

    // Try to resolve again (should be ignored)
    deferred.resolve(43);

    await promise;
    expect(callCount).toBe(1);
  });
});