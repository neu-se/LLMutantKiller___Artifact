import { defer } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeNodeResolver", () => {
  it("should resolve with single value when called with two arguments", () => {
    const deferred = defer();
    const resolver = deferred.makeNodeResolver();
    const testValue = "test";
    resolver(null, testValue);
    return deferred.promise.then((value: unknown) => {
      expect(value).toBe(testValue);
    });
  });
});