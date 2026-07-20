import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeNodeResolver", () => {
  it("should resolve with the single value when callback is called with exactly 2 arguments (null, value)", async () => {
    const deferred = Q.defer();
    const nodeback = deferred.makeNodeResolver();
    
    // Call with exactly 2 arguments: null error and a value
    nodeback(null, "hello");
    
    const result = await deferred.promise;
    
    // Original code: resolves with "hello" (not ["hello"])
    // Mutated code: resolves with ["hello"] because arguments.length >= 2 is true
    expect(result).toBe("hello");
    expect(Array.isArray(result)).toBe(false);
  });
});