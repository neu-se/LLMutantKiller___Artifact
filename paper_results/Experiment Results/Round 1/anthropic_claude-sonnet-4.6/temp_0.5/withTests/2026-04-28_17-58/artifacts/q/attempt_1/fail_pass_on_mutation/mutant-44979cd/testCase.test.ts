import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module CommonJS export", () => {
  it("should export a callable Q function with all expected promise methods when loaded as a CommonJS module", () => {
    // The mutation changes `typeof exports === "object"` to `true`
    // This tests that the module correctly exports Q via CommonJS
    // and that the exported object has the expected interface
    expect(typeof Q).toBe("function");
    expect(typeof Q.defer).toBe("function");
    expect(typeof Q.resolve).toBe("function");
    expect(typeof Q.reject).toBe("function");
    expect(typeof Q.all).toBe("function");
    expect(typeof Q.when).toBe("function");
    expect(typeof Q.promise).toBe("function");
    
    // Verify Q actually works - create a deferred and resolve it
    const deferred = Q.defer();
    deferred.resolve(42);
    
    const result = deferred.promise.inspect();
    expect(result.state).toBe("fulfilled");
    expect(result.value).toBe(42);
  });
});