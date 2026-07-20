import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise resolution", () => {
  it("resolves a deferred promise with the correct value", () => {
    const deferred = Q.defer();
    deferred.resolve(99);
    
    return deferred.promise.then(function (value: unknown) {
      expect(value).toBe(99);
    });
  });
});