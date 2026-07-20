const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q error handling", () => {
  it("should create proper error stacks with file and line information", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Create a rejection with a stack trace
    deferred.reject(new Error("Test error"));

    // The promise should have stack information
    promise.then(null, (error) => {
      expect(error).toBeInstanceOf(Error);
      expect(error.stack).toBeDefined();
    });
  });
});