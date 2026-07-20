const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.then behavior", () => {
  it("should correctly handle the done flag in promise resolution", (done) => {
    let callCount = 0;
    const deferred = Q.defer();
    const promise = deferred.promise;

    promise.then((value: any) => {
      callCount++;
      expect(value).toBe(42);
      // Simulate the mutation by trying to call resolve again
      deferred.resolve(43);
    });

    deferred.resolve(42);

    setTimeout(() => {
      expect(callCount).toBe(1);
      done();
    }, 50);
  });
});