const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace behavior", () => {
  it("should not capture stack traces when hasStacks is false", () => {
    // Force long stack support to test the hasStacks behavior
    Q.longStackSupport = true;

    // Create a promise chain that would trigger stack trace capture
    const error = new Error("Test error");
    const deferred = Q.defer();
    deferred.reject(error);
    const promise = deferred.promise;

    return promise.then(
      () => {
        throw new Error("Should not resolve");
      },
      (caughtError: Error) => {
        // In original code (hasStacks = false), the stack won't be captured
        // In mutated code (hasStacks = true), the stack would be captured
        // We check for the presence of the stack property that Q adds
        expect(caughtError).not.toHaveProperty('stack');
      }
    );
  });
});