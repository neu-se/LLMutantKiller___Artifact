import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q basic functionality", () => {
  it("can create and resolve a deferred promise", () => {
    const deferred = Q.defer();
    deferred.resolve(1);
    return deferred.promise.then((value: unknown) => {
      expect(value).toBe(1);
    });
  });
});