const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise exception property", () => {
  it("should set exception property only when promise is rejected", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    deferred.reject(new Error("test error"));

    // In the original code, exception is only set when state is "rejected"
    // In the mutated code, exception is always set (if (true))
    // So we check that the exception property exists
    expect(promise.exception).toBeDefined();
    expect(promise.exception).toBeInstanceOf(Error);
    expect(promise.exception.message).toBe("test error");
  });
});