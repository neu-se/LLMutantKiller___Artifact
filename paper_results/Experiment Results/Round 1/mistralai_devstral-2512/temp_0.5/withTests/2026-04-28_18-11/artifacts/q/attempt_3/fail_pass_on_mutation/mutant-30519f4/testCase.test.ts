import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all behavior with mixed promises", () => {
  it("should handle already fulfilled promises correctly", async () => {
    const deferred = Q.defer();
    const fulfilledPromise = Q(42);
    const promises = [fulfilledPromise, deferred.promise];

    // The mutation changes the condition from checking if state === "fulfilled"
    // to state !== "fulfilled", which would incorrectly treat fulfilled promises
    // as if they need to be awaited
    const resultPromise = Q.all(promises);
    deferred.resolve(100);

    const result = await resultPromise;
    expect(result).toEqual([42, 100]);
  });
});