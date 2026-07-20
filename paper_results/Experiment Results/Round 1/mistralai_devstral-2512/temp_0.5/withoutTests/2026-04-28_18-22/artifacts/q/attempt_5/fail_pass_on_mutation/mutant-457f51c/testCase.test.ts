const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise exception property", () => {
  it("should not set exception property for fulfilled promises", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    deferred.fulfill("success");

    // In the original code, exception is only set when state is "rejected"
    // In the mutated code, exception is always set (if (true))
    // So for a fulfilled promise, exception should not be set
    expect(promise.exception).toBeUndefined();
  });
});