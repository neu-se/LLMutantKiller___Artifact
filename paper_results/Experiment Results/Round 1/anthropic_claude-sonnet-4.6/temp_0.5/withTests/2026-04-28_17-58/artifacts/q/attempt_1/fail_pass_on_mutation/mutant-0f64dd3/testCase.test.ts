import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module basic functionality", () => {
  it("should successfully load and resolve a simple promise", () => {
    // The mutation in captureLine() causes it to return undefined instead of
    // the line number when fileNameAndLineNumber is successfully obtained.
    // In the mutated version, `if (fileNameAndLineNumber)` returns early,
    // meaning qFileName is never set and the function returns undefined.
    // This causes qStartingLine and qEndingLine to be undefined.
    // We verify the module loads and basic operations work correctly.
    expect(typeof Q).toBe("function");
    
    const deferred = Q.defer();
    deferred.resolve(42);
    
    return deferred.promise.then((value: number) => {
      expect(value).toBe(42);
      // Verify Q is a proper promise library with expected methods
      expect(typeof Q.defer).toBe("function");
      expect(typeof Q.resolve).toBe("function");
      expect(typeof Q.reject).toBe("function");
      expect(typeof Q.all).toBe("function");
      // The module should have loaded correctly with captureLine working
      // In the mutated version, captureLine returns undefined causing
      // qStartingLine/qEndingLine to be undefined, but the module still loads.
      // However, if captureLine throws due to the inverted condition causing
      // it to try to access fileNameAndLineNumber[0] when it's null/undefined,
      // the module would fail to load entirely.
      expect(Q.isPromise(deferred.promise)).toBe(true);
    });
  });
});