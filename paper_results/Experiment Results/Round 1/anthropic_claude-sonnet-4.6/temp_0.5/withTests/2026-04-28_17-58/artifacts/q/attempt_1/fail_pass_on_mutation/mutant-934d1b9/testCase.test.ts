import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("defer double-resolution prevention", () => {
  it("should ignore subsequent resolve calls after the deferred has already been resolved", async () => {
    const deferred = Q.defer();

    // Resolve with first value
    deferred.resolve(42);
    // Attempt to resolve again with a different value - should be ignored
    deferred.resolve(99);

    const value = await deferred.promise;
    expect(value).toBe(42);
  });
});