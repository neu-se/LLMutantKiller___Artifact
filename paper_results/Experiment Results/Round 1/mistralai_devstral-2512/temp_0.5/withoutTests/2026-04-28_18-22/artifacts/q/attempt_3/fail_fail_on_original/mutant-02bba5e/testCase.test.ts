const Q = require("./q.js");

describe("Q error handling", () => {
  it("should handle null errors in long stack traces correctly", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will reject with a null error
    const deferred = Q.defer();
    const promise = deferred.promise.then(() => {
      throw new Error("Should not reach here");
    }, (error: any) => {
      // This should handle the null error without issues
      expect(error).toBeNull();
    });

    // Reject with null error
    deferred.reject(null);

    // Return the promise chain
    return promise;
  });
});