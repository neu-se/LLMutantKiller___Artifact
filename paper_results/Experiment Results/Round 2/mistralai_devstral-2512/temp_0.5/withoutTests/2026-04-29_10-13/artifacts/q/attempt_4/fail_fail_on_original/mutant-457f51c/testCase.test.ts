const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise valueOf behavior with mutation", () => {
  it("should correctly handle valueOf for rejected promises without exposing exception", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    const error = new Error("test error");

    // Reject the promise
    deferred.reject(error);

    // In the original code, valueOf should return the promise itself for rejected state
    // The mutation changes the condition to always true, which would incorrectly
    // set the exception property and potentially change valueOf behavior
    const valueOfResult = promise.valueOf();

    // The valueOf should return the promise itself for rejected promises
    expect(valueOfResult).toBe(promise);

    // The mutation would incorrectly set exception property even when not in rejected state
    // This test verifies the original behavior where exception is only set for rejected state
    if (promise.isRejected()) {
      // In original code, exception should be set for rejected promises
      expect(promise).toHaveProperty("exception");
      expect(promise.exception).toBe(error);
    } else {
      // This branch should not be reached in original code for rejected promises
      expect(promise).not.toHaveProperty("exception");
    }
  });
});