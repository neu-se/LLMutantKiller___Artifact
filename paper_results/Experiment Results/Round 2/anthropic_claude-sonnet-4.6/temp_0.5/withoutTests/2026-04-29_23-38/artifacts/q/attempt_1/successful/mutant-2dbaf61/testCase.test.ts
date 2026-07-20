import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q hasStacks behavior", () => {
  it("should properly track stack traces when longStackSupport is enabled", async () => {
    Q.longStackSupport = true;
    
    const deferred = Q.defer();
    const promise = deferred.promise;
    
    // The promise should have a stack property when longStackSupport is true and hasStacks is true
    expect(promise.stack).toBeDefined();
    expect(typeof promise.stack).toBe("string");
    
    deferred.resolve(42);
    const value = await promise;
    expect(value).toBe(42);
    
    Q.longStackSupport = false;
  });
});