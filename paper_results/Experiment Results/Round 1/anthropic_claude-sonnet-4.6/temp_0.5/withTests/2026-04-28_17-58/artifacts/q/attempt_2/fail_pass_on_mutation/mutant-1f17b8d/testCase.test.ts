import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all with pending promises", () => {
  it("should resolve with fulfilled values when array contains a mix of already-fulfilled and pending promises", () => {
    const deferred = Q.defer();

    // One already-fulfilled promise and one pending promise
    const alreadyFulfilled = Q(42);
    const pending = deferred.promise;

    const allPromise = Q.all([alreadyFulfilled, pending]);

    // Resolve the pending promise after setting up Q.all
    deferred.resolve(99);

    return allPromise.then(function (results: any[]) {
      expect(results).toEqual([42, 99]);
    });
  });
});