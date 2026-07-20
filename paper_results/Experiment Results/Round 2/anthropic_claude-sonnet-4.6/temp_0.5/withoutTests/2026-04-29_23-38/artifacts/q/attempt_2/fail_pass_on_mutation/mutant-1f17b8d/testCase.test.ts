import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all with pending promises", () => {
  it("should wait for pending promises to resolve before resolving the all promise", () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();

    const allPromise = Q.all([deferred1.promise, deferred2.promise]);

    // Resolve after Q.all has been set up
    deferred1.resolve(42);
    deferred2.resolve(99);

    return allPromise.then((result: any[]) => {
      // With the mutation, pendingCount never increments, so deferred.resolve(promises)
      // is called immediately with the raw promise objects, not the resolved values.
      // Each element should be the resolved value, not a promise object.
      expect(result[0]).toBe(42);
      expect(result[1]).toBe(99);
      expect(Q.isPromise(result[0])).toBe(false);
      expect(Q.isPromise(result[1])).toBe(false);
    });
  });
});