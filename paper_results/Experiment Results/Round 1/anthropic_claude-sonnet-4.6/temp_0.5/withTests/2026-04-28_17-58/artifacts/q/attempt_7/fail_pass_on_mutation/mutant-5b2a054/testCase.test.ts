import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("observers called even after throw", () => {
  it("second observer is called even when first observer throws", () => {
    const deferred = Q.defer();
    
    Q.when(deferred.promise, function () {
      throw new Error("first observer throws");
    });

    const result = Q.when(deferred.promise, function (value: unknown) {
      return value;
    });

    deferred.resolve(42);

    return result.then(function (value: unknown) {
      expect(value).toBe(42);
    });
  });
});