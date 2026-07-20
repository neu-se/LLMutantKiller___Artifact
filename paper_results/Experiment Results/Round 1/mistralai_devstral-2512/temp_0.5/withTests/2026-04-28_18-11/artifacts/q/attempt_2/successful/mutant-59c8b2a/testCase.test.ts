const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("defer.valueOf behavior", () => {
  it("should return the resolved value when promise is fulfilled", () => {
    const deferred = Q.defer();
    const expectedValue = 42;
    deferred.resolve(expectedValue);
    const result = deferred.promise.valueOf();
    expect(result).toBe(expectedValue);
  });
});