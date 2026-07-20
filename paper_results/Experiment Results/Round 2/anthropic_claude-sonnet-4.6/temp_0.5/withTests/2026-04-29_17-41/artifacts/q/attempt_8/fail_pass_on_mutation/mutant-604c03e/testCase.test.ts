import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("basic promise functionality still works", () => {
  it("resolves a simple deferred promise", () => {
    const deferred = Q.defer();
    deferred.resolve(42);
    return deferred.promise.then(function(value) {
      expect(value).toBe(42);
    });
  });
});