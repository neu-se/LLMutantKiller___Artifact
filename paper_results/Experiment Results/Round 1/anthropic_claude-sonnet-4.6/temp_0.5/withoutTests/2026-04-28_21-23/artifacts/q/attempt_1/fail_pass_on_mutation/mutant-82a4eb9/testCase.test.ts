import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module loading", () => {
  it("should export Q as a function via CommonJS module system", () => {
    // Verify Q is loaded correctly via the CommonJS branch
    // In the original code: exports === "object" && module === "object" must both be true
    // In the mutated code: || means either condition suffices
    // Both conditions are true in Node.js, so behavior should be the same
    // But we can verify the module exports correctly
    expect(typeof Q).toBe("function");
    expect(typeof Q.defer).toBe("function");
    expect(typeof Q.promise).toBe("function");
    expect(typeof Q.resolve).toBe("function");
    
    // Verify basic promise functionality works
    const deferred = Q.defer();
    expect(deferred).toBeDefined();
    expect(typeof deferred.resolve).toBe("function");
    expect(typeof deferred.reject).toBe("function");
    expect(typeof deferred.promise).toBe("object");
  });
});