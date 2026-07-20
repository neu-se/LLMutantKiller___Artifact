import { Q } from "./q.js";

describe("makeNodeResolver mutation test", () => {
  it("should handle exactly two arguments correctly", () => {
    const deferred = Q.defer();
    const resolver = deferred.makeNodeResolver();

    // Call with exactly 2 arguments (error is null, value is provided)
    resolver(null, "test-value");

    return deferred.promise.then((value) => {
      expect(value).toBe("test-value");
    });
  });
});