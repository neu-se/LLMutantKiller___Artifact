import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeNodeResolver", () => {
  it("should resolve with a single value when callback is called with exactly 2 arguments (null, value)", async () => {
    const deferred = Q.defer();
    const nodeback = deferred.makeNodeResolver();

    // Call with exactly 2 arguments: null error and a single value
    nodeback(null, "hello");

    const result = await deferred.promise;

    // With original code (> 2): resolves with "hello" (single value)
    // With mutated code (>= 2): resolves with ["hello"] (array)
    expect(result).toBe("hello");
  });
});