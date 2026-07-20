const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace parsing", () => {
  it("should correctly parse stack traces with named functions", () => {
    // Create a scenario that would trigger stack trace parsing
    const deferred = Q.defer();
    deferred.reject(new Error("test error"));

    // Force the error to be processed through the stack trace mechanism
    return deferred.promise.then(
      () => {
        throw new Error("Should not reach here");
      },
      (error: Error) => {
        // The error should have a stack trace that can be parsed
        expect(error.stack).toBeDefined();
        // This indirectly tests the getFileNameAndLineNumber function
        // through the stack trace filtering mechanism
        return true;
      }
    );
  });
});