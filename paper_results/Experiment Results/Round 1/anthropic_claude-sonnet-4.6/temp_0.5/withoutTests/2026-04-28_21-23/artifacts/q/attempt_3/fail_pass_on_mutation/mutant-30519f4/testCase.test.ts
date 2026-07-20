import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all mutation detection", () => {
  it("should resolve immediately when all promises are already fulfilled, without waiting", async () => {
    // With original code: fulfilled promises are detected synchronously,
    // pendingCount stays 0, deferred.resolve is called synchronously
    // With mutated code: fulfilled promises go through when() path,
    // pendingCount gets incremented, but a PENDING promise would have
    // snapshot.value = undefined assigned directly without waiting
    
    const deferred = Q.defer();
    const pendingPromise = deferred.promise;
    
    // With mutation: pendingPromise matches !== "fulfilled" (it's "pending"),
    // so promises[0] = snapshot.value = undefined, pendingCount stays 0
    // Then pendingCount === 0 triggers deferred.resolve([undefined]) immediately
    // Result would be [undefined] instead of waiting for deferred to resolve
    
    // With original: pendingPromise does NOT match === "fulfilled",
    // so it goes through when(), pendingCount = 1, waits for resolution
    
    const allPromise = Q.all([pendingPromise]);
    
    // Resolve after starting
    deferred.resolve(123);
    
    const result = await allPromise;
    expect(result).toEqual([123]);
  });
});