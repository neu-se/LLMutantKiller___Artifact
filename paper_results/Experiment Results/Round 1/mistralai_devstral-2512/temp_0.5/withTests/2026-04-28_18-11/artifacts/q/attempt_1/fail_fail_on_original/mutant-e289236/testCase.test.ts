import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deferred promise resolution behavior", () => {
  it("should not resolve deferred promise when already resolved", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Resolve the deferred promise
    deferred.resolve("first value");

    // Attempt to resolve again - should have no effect
    deferred.resolve("second value");

    return promise.then((value) => {
      // The value should be the first resolution value
      expect(value).toBe("first value");
    });
  });
});