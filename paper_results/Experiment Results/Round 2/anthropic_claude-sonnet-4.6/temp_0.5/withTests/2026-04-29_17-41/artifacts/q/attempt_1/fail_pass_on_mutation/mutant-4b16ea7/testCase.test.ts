import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q basic promise resolution", () => {
  it("should resolve a deferred promise with the correct value", (done) => {
    const deferred = Q.defer();
    deferred.resolve(42);
    deferred.promise.then((value: number) => {
      expect(value).toBe(42);
      done();
    });
  });
});