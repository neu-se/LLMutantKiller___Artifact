import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module loading", () => {
  it("should export Q as a function with expected properties when loaded as CommonJS module", () => {
    // The mutation changes `typeof exports === "object"` to `true`
    // In Node.js, exports is always an object, so both would take the CommonJS path
    // But we can verify the module loaded correctly via CommonJS by checking
    // that Q is properly exported and functional
    expect(typeof Q).toBe("function");
    expect(typeof Q.defer).toBe("function");
    expect(typeof Q.resolve).toBe("function");
    expect(typeof Q.reject).toBe("function");
    expect(typeof Q.all).toBe("function");
    
    // Verify basic promise functionality works
    const deferred = Q.defer();
    deferred.resolve(42);
    
    return deferred.promise.then((value: number) => {
      expect(value).toBe(42);
    });
  });
});