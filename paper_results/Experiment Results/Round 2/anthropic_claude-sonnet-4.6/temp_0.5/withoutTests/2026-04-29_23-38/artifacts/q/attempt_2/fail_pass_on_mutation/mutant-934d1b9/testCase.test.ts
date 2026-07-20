import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.defer resolve guard", () => {
  it("should ignore subsequent resolve calls after the first resolution", async () => {
    const deferred = Q.defer();
    
    // First resolve with a rejected promise
    deferred.reject(new Error("first rejection"));
    
    // Second resolve attempt with a fulfilled value
    // Original: guard `if (resolvedPromise)` prevents this from taking effect
    // Mutated: guard is `if (false)`, so this DOES take effect, changing resolvedPromise
    deferred.resolve(42);
    
    // In original code: promise should be rejected
    // In mutated code: promise should be fulfilled with 42
    let caught = false;
    let resolvedValue: unknown;
    
    await deferred.promise.then(
      (val) => { resolvedValue = val; },
      () => { caught = true; }
    );
    
    expect(caught).toBe(true);
    expect(resolvedValue).toBeUndefined();
  });
});