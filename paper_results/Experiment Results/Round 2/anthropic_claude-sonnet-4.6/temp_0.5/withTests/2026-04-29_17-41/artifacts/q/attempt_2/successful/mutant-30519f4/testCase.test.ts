import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all", () => {
  it("should wait for a pending promise to resolve before fulfilling", async () => {
    const deferred = Q.defer<number>();

    // Resolve the deferred after a short delay
    setTimeout(() => {
      deferred.resolve(42);
    }, 50);

    // With original code: deferred.promise is pending, so pendingCount=1,
    // Q.all waits for it to resolve, result is [42].
    //
    // With mutated code: deferred.promise is pending, state !== "fulfilled" is TRUE,
    // so it short-circuits with snapshot.value (undefined for pending),
    // pendingCount stays 0, Q.all resolves immediately with [undefined].
    const result = await Q.all([deferred.promise]);

    expect(result).toEqual([42]);
  });
});