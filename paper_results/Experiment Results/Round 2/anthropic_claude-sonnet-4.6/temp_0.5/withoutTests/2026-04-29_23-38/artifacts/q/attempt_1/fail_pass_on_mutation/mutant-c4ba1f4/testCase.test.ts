import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise resolution", () => {
  it("should resolve a deferred promise and execute then callbacks", (done) => {
    const deferred = Q.defer();
    
    deferred.promise.then((value: number) => {
      expect(value).toBe(42);
      done();
    }, (err: unknown) => {
      done(err);
    });
    
    deferred.resolve(42);
  });
});