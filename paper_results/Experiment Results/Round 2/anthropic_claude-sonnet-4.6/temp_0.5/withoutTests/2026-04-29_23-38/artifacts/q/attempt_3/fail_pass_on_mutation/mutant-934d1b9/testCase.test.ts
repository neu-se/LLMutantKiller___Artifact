import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.defer resolve guard", () => {
  it("should use the first resolved value for then-callbacks attached after resolution", async () => {
    const deferred = Q.defer();
    
    // First resolve
    deferred.resolve(1);
    
    // Second resolve - should be ignored in original, but in mutated code
    // resolvedPromise gets overwritten to Q(2)
    deferred.resolve(2);
    
    // Attach .then() AFTER both resolves - this goes directly to resolvedPromise
    // In original: resolvedPromise = Q(1), so value = 1
    // In mutated: resolvedPromise = Q(2), so value = 2
    const value = await deferred.promise.then((v) => v);
    
    expect(value).toBe(1);
  });
});