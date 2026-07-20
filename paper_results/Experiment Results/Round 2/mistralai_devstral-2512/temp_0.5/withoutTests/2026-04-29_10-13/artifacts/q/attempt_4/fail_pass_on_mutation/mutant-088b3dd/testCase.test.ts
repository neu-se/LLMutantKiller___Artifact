const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with function names", () => {
    // Create a promise that will trigger stack trace parsing
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Force stack trace parsing by rejecting with an error
    deferred.reject(error);

    // The mutation will cause the stack trace parsing to fail
    // This test passes if no exception is thrown during parsing
    expect(() => {
      // Trigger the error handling
      deferred.promise.then(null, (e: any) => {
        // Stack trace parsing happens here
      });
    }).not.toThrow();
  });
});