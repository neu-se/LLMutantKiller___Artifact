import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise basic resolution", () => {
  it("resolves a deferred promise with the correct value", () => {
    return new Promise<void>((done) => {
      const deferred = Q.defer();
      deferred.resolve(42);
      deferred.promise.then((value: number) => {
        expect(value).toBe(42);
        done();
      });
    });
  });
});