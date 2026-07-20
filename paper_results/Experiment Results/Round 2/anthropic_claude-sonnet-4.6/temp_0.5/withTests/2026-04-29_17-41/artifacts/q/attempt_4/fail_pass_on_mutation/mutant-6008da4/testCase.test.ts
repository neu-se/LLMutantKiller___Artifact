import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("promise resolution", () => {
  it("fulfills with correct value through deferred", () => {
    const deferred = Q.defer();
    deferred.resolve(42);
    return deferred.promise.then((value: unknown) => {
      expect(value).toBe(42);
    });
  });
});