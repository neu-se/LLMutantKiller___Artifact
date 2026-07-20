import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine behavior when hasStacks is available", () => {
  it("should load the Q module successfully and return a valid promise, confirming captureLine executed without error", () => {
    // The module initialization calls captureLine() twice.
    // With the mutation, if hasStacks were false, it would throw instead of returning early.
    // We verify the module loaded correctly and basic promise functionality works,
    // which depends on successful module initialization including captureLine calls.
    expect(typeof Q).toBe("function");
    expect(typeof Q.defer).toBe("function");
    
    const deferred = Q.defer();
    deferred.resolve(42);
    
    return deferred.promise.then((value: number) => {
      expect(value).toBe(42);
    });
  });
});