import { defer } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeNodeResolver mutation test", () => {
  it("should handle exactly two arguments correctly", () => {
    const deferred = defer();
    const resolver = deferred.makeNodeResolver();

    // Call with exactly 2 arguments (error is null, value is provided)
    resolver(null, "test-value");

    return deferred.promise.then((value: any) => {
      expect(value).toBe("test-value");
    });
  });
});