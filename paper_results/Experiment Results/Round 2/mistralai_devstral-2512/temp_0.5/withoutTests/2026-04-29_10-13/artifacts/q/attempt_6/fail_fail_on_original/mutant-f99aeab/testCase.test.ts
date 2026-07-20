// testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace capture", () => {
  it("should correctly identify when stack traces are available", () => {
    // This test directly checks the behavior affected by the mutation
    // The mutation changes `if (!hasStacks)` to `if (hasStacks)` in the captureLine function
    // This affects how qFileName is set and whether stack traces can be properly filtered

    // Create a deferred promise to test stack trace handling
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Reject the promise with an error that has a stack trace
    deferred.reject(error);

    // Check the promise's stack property (which depends on captureLine working correctly)
    const promise = deferred.promise;
    expect(promise.stack).toBeDefined();

    // The stack should contain our error message
    expect(promise.stack).toContain("Test error");

    // Use setTimeout to allow the promise to resolve in the next tick
    return new Promise((resolve) => {
      setTimeout(resolve, 10);
    });
  });
});