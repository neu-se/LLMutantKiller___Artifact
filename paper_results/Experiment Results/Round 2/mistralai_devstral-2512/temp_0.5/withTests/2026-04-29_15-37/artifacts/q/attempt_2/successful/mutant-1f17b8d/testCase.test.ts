import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all behavior with pending promises", () => {
  it("should resolve when all promises in array are fulfilled", async () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const promises = [deferred1.promise, deferred2.promise];

    const resultPromise = Q.all(promises);

    // Resolve promises after a short delay to ensure async behavior
    setTimeout(() => {
      deferred1.resolve(10);
      deferred2.resolve(20);
    }, 10);

    const result = await resultPromise;
    expect(result).toEqual([10, 20]);
  });
});