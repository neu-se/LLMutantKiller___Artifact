import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all mutation detection", () => {
  it("should not resolve until all pending promises have resolved", () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();

    let allResolved = false;
    const allPromise = Q.all([deferred1.promise, deferred2.promise]);
    allPromise.then(() => {
      allResolved = true;
    });

    // With the mutation, allResolved becomes true before we resolve the deferreds
    // because pendingCount stays 0 and deferred.resolve is called immediately.
    // With original code, allResolved stays false until we resolve the deferreds.
    return Q.delay(10).then(() => {
      // After a tick but before resolving deferreds
      expect(allResolved).toBe(false);

      deferred1.resolve("a");
      deferred2.resolve("b");

      return allPromise.then((result: any[]) => {
        expect(result).toEqual(["a", "b"]);
      });
    });
  });
});