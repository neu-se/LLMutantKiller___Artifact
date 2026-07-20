import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all with pending promises", () => {
  it("should wait for pending promises to resolve before fulfilling", (done) => {
    const deferred = Q.defer();

    // This array has one already-fulfilled value and one pending promise
    const allPromise = Q.all([Q(42), deferred.promise]);

    let resolved = false;

    allPromise.then((values: any[]) => {
      resolved = true;
      expect(values).toEqual([42, 99]);
      done();
    }, (err: any) => {
      done(err);
    });

    // On mutated code, allPromise resolves immediately (pendingCount stays 0)
    // before we resolve the deferred, so we check that it hasn't resolved yet
    setTimeout(() => {
      expect(resolved).toBe(false);
      deferred.resolve(99);
    }, 50);
  });
});