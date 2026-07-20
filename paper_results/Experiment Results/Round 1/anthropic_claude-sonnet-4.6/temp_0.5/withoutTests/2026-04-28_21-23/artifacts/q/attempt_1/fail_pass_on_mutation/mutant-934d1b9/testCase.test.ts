import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("defer resolve guard", () => {
  it("should only resolve a deferred once, ignoring subsequent resolve calls", async () => {
    const deferred = Q.defer();
    
    // Resolve with first value
    deferred.resolve(42);
    
    // Try to resolve again with a different value
    deferred.resolve(99);
    
    const result = await deferred.promise;
    
    // The promise should have the first resolved value, not the second
    expect(result).toBe(42);
  });
});