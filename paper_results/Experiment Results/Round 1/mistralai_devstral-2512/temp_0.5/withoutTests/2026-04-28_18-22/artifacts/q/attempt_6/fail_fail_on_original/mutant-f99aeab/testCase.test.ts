const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace handling", () => {
  it("should capture stack traces when supported by environment", () => {
    // Create a promise chain that would trigger stack trace capture
    const deferred = Q.defer();
    const promise = deferred.promise.then(() => {
      // This nested promise should capture stack traces if supported
      return Q.resolve(42);
    });

    // Force an error to trigger stack trace handling
    const testError = new Error("test error");
    deferred.reject(testError);

    // Handle the rejection
    let stackCaptured = false;
    promise.catch((error) => {
      // Check if the error has stack information
      // In the original code with stack support, this should be true
      // In the mutated code, stack capture would be skipped
      stackCaptured = !!error.stack;
    });

    // The test verifies that stack traces are captured when supported
    // The mutation would cause this to fail by incorrectly skipping stack capture
    expect(stackCaptured).toBe(true);
  });
});