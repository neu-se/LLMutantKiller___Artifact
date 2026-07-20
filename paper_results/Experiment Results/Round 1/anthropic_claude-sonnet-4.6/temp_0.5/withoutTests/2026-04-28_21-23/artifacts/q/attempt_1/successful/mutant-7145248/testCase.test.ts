import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeNodeResolver", () => {
  it("should resolve with a single value when callback is called with (null, value)", async () => {
    const deferred = Q.defer();
    const resolver = deferred.makeNodeResolver();
    
    // Call with exactly 2 arguments: (null, value)
    resolver(null, "hello");
    
    const result = await deferred.promise;
    
    // In original code: arguments.length > 2 is false (length is 2),
    // so it resolves with value directly: "hello"
    // In mutated code: arguments.length <= 2 is true (length is 2),
    // so it resolves with array_slice(arguments, 1): ["hello"]
    expect(result).toBe("hello");
  });
});