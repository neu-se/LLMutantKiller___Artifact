import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.then - done flag prevents double resolution", () => {
  it("should resolve to fulfilled value and not be overwritten by rejection path", async () => {
    // A fulfilled promise - the fulfillment handler sets done=true
    // With the mutation, the rejection path still runs after fulfillment
    // causing deferred.resolve to be called with a rejected promise
    const p = Q(42).then(
      function(value: any) {
        return value * 2;
      }
      // No rejection handler - so _rejected returns reject(exception)
      // With mutation: deferred.resolve(reject(undefined)) is called after fulfillment
    );

    const result = await p;
    // Original: resolves to 84
    // Mutated: deferred.resolve called twice - second time with reject(undefined)
    // but since deferred ignores second resolve, result should still be 84
    expect(result).toBe(84);
  });
});