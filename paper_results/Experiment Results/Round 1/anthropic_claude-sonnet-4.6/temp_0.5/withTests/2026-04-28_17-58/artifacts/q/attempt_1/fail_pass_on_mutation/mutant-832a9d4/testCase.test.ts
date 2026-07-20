import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise resolution", () => {
  it("should resolve a deferred promise asynchronously", (done) => {
    const deferred = Q.defer();
    let resolved = false;

    deferred.promise.then((value: number) => {
      resolved = true;
      expect(value).toBe(42);
      done();
    });

    expect(resolved).toBe(false);
    deferred.resolve(42);
  });
});