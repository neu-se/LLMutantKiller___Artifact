import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeNodeResolver mutation test", () => {
  it("should handle exactly two arguments correctly", () => {
    const deferred = Q.defer();
    const resolver = deferred.makeNodeResolver();

    // Call with exactly 2 arguments (error, value)
    resolver(null, "test-value");

    return deferred.promise.then((value: any) => {
      // In the original code, this should resolve with "test-value"
      // In the mutated code, this would incorrectly resolve with ["test-value"]
      expect(value).toBe("test-value");
    });
  });
});