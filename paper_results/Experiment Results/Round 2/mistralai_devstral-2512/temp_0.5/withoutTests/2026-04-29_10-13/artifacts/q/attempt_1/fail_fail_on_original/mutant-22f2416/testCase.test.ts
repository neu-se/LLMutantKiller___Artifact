import { Q } from "./q.js";

describe("Q.makeNodeResolver", () => {
  it("should handle exactly two arguments correctly", () => {
    const deferred = Q.defer();
    const resolver = deferred.makeNodeResolver();
    const testValue = "test";
    resolver(null, testValue);
    return deferred.promise.then((value) => {
      expect(value).toBe(testValue);
    });
  });
});