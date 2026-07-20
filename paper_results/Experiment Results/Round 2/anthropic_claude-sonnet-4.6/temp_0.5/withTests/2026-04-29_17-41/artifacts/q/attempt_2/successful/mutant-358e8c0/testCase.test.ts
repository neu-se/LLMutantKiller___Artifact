import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all", () => {
  it("should wait for all promises to fulfill before resolving with their values", () => {
    const deferred = Q.defer();

    // Start with a pending promise
    const allPromise = Q.all([Q(1), deferred.promise]);

    let resolved = false;
    let resolvedValues: unknown = undefined;

    allPromise.then((values: unknown) => {
      resolved = true;
      resolvedValues = values;
    });

    // With the mutation (true), allPromise resolves immediately with [1, undefined]
    // With original code, it stays pending until deferred resolves
    // We need to check it hasn't resolved yet before resolving deferred
    return Q.delay(50).then(() => {
      // Original: still pending (deferred not resolved yet)
      // Mutated: already resolved with wrong values
      expect(allPromise.isPending()).toBe(true);

      deferred.resolve(2);

      return Q.delay(50).then(() => {
        expect(resolved).toBe(true);
        expect(resolvedValues).toEqual([1, 2]);
      });
    });
  });
});