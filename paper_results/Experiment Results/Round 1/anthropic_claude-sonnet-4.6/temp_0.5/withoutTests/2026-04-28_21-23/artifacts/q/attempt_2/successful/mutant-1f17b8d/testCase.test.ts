import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all", () => {
  it("should wait for pending promises and resolve with their fulfilled values", async () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();

    // Start Q.all BEFORE resolving the promises, so they are pending
    const allPromise = Q.all([deferred1.promise, deferred2.promise]);

    // Resolve after Q.all has started tracking them
    setTimeout(() => {
      deferred1.resolve(42);
      deferred2.resolve(99);
    }, 0);

    const result = await allPromise;

    // In the original code, result should be [42, 99]
    // In the mutated code, pendingCount never increments, so it resolves
    // immediately with the unresolved promise objects instead of values
    expect(result[0]).toBe(42);
    expect(result[1]).toBe(99);
  });
});