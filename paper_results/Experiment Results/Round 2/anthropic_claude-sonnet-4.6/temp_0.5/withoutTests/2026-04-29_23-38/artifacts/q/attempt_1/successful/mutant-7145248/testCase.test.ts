import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeNodeResolver with multiple success arguments", () => {
  it("should resolve with an array of values when callback is called with more than one success argument", async () => {
    const deferred = Q.defer();
    const nodeback = deferred.makeNodeResolver();
    
    // Call with no error and multiple values (3 arguments total: null, val1, val2)
    nodeback(null, "first", "second");
    
    const result = await deferred.promise;
    
    // In original code: arguments.length > 2 is true (3 > 2), so resolves with array ["first", "second"]
    // In mutated code: arguments.length <= 2 is false (3 <= 2 is false), so falls to else: resolves with just "first"
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual(["first", "second"]);
  });
});