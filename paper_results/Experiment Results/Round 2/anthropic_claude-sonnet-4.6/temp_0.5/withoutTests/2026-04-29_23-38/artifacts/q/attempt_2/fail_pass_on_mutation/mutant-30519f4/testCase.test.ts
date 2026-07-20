import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all mutation detection", () => {
  it("should correctly resolve a mix of fulfilled and pending promises", async () => {
    const deferred = Q.defer();
    
    // Mix: one already-fulfilled, one pending that will be resolved
    const alreadyFulfilled = Q(42);
    const pending = deferred.promise;
    
    const allPromise = Q.all([alreadyFulfilled, pending]);
    
    // Resolve the pending promise
    deferred.resolve(99);
    
    const result = await allPromise;
    
    // With mutation: pending promise enters the if-branch, sets promises[1] = snapshot.value (undefined)
    // and never increments pendingCount for it, so deferred resolves with [42, undefined]
    // Original: pending goes through async when(), resolves correctly to [42, 99]
    expect(result).toEqual([42, 99]);
  });
});