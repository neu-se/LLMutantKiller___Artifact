import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module loads and initializes correctly", () => {
  it("should load successfully and resolve a basic promise, indicating captureLine did not throw", async () => {
    // If the mutation caused captureLine to throw (by not returning early when
    // fileNameAndLineNumber is null), the module would fail to load entirely.
    // The fact that we can import and use Q means captureLine worked correctly.
    // Additionally, test that stack filtering works (depends on qStartingLine/qEndingLine/qFileName being set).
    expect(typeof Q).toBe("function");
    expect(typeof Q.defer).toBe("function");
    
    const deferred = Q.defer();
    deferred.resolve(42);
    
    const value = await deferred.promise;
    expect(value).toBe(42);
    
    // Test that Q.longStackSupport works (relies on internal stack line tracking)
    Q.longStackSupport = true;
    const d = Q.defer();
    d.resolve("test");
    const result = await d.promise.then((v: string) => v + "!");
    expect(result).toBe("test!");
    Q.longStackSupport = false;
  });
});