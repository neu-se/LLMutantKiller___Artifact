import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise basic resolution", () => {
  it("should resolve a deferred promise asynchronously and fulfill correctly", (done) => {
    const deferred = Q.defer();
    const results: number[] = [];

    deferred.promise.then((value: number) => {
      results.push(value);
      expect(results).toEqual([1, 42]);
      done();
    });

    results.push(1);
    deferred.resolve(42);
  });
});