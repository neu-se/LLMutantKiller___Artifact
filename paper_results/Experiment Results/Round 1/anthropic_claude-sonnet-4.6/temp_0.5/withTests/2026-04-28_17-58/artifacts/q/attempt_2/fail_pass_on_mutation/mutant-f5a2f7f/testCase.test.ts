import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q basic promise functionality", () => {
  it("resolves a deferred promise with the correct value", () => {
    const deferred = Q.defer();
    deferred.resolve(42);
    return deferred.promise.then((value: number) => {
      expect(value).toBe(42);
    });
  });
});