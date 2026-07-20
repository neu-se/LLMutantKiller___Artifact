const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise valueOf behavior", () => {
  it("should return the promise itself when state is pending and not return the inspected value", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    const result = promise.valueOf();
    expect(result).toBe(promise);
    expect(result).not.toBe("some value");
  });
});