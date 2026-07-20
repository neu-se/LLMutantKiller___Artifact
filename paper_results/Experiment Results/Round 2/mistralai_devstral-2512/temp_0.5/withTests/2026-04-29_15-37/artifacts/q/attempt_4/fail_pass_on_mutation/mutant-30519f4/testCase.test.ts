const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.all behavior with mixed promises", () => {
  it("should correctly handle array with both fulfilled and pending promises", async () => {
    const deferred = Q.defer();
    const promises = [Q(1), deferred.promise, Q(3)];
    const resultPromise = Q.all(promises);
    expect(resultPromise.isPending()).toBe(true);
    deferred.resolve(2);
    const result = await resultPromise;
    expect(result).toEqual([1, 2, 3]);
  });
});