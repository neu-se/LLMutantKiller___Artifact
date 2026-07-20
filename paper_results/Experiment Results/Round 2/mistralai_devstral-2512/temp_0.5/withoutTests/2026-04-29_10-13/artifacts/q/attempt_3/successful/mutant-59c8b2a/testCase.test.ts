const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise valueOf behavior", () => {
  it("should return the resolved value when promise is fulfilled", () => {
    const deferred = Q.defer();
    const expectedValue = 42;
    deferred.resolve(expectedValue);

    const promise = deferred.promise;
    return promise.then(() => {
      // After resolution, valueOf should return the resolved value
      expect(promise.valueOf()).toBe(expectedValue);
    });
  });
});