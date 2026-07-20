import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module loading and basic functionality", () => {
  it("should export Q with all expected methods when loaded in a CommonJS environment", () => {
    // Verify Q is properly exported and functional
    // This tests that the module initialization completed correctly
    expect(Q).toBeDefined();
    expect(typeof Q).toBe("function");
    expect(typeof Q.defer).toBe("function");
    expect(typeof Q.resolve).toBe("function");
    expect(typeof Q.reject).toBe("function");
    expect(typeof Q.all).toBe("function");
    expect(typeof Q.when).toBe("function");
    
    // Test basic promise resolution to ensure Q is fully initialized
    const deferred = Q.defer();
    deferred.resolve(42);
    
    return deferred.promise.then((value: number) => {
      expect(value).toBe(42);
    });
  });
});