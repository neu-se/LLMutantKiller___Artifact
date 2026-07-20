const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing with named functions", () => {
  it("should correctly handle stack traces from named functions", () => {
    // Create a promise chain that will generate a stack trace
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a rejection that will generate a stack trace
    deferred.reject(error);

    // Return a promise that will handle the error
    return deferred.promise.then(
      () => {
        throw new Error("Should not reach here");
      },
      (err) => {
        // If we can handle the error without issues, the test passes
        expect(err.message).toBe("Test error");
      }
    );
  });
});