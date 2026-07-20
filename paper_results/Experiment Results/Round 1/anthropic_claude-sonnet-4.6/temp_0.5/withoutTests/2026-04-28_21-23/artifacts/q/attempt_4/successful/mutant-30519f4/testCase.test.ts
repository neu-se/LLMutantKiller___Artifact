import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all mutation detection", () => {
  it("should wait for a pending promise to resolve rather than using undefined", async () => {
    const deferred = Q.defer();
    
    // Use a raw Q promise (not yet resolved) so it's truly pending
    const allPromise = Q.all([deferred.promise]);
    
    // With original code: pending promise goes to else branch, pendingCount=1,
    // waits for when() callback
    // With mutated code: pending promise matches !== "fulfilled", 
    // promises[0] = snapshot.value = undefined, pendingCount stays 0,
    // then immediately resolves with [undefined]
    
    // Check that it hasn't resolved yet (it should be pending)
    let resolved = false;
    let resolvedValue: any;
    allPromise.then((val: any) => {
      resolved = true;
      resolvedValue = val;
    });
    
    // Give a tick for any synchronous resolution to propagate
    await Q().then(() => {}).then(() => {}).then(() => {});
    
    // With mutation, it would already be resolved with [undefined]
    // With original, it should still be pending
    expect(resolved).toBe(false);
    
    deferred.resolve(42);
    const result = await allPromise;
    expect(result).toEqual([42]);
  });
});