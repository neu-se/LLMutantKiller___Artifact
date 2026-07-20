// testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace capture", () => {
  it("should correctly capture line numbers when hasStacks is true", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise that will be rejected
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Check if the environment supports stack traces
    const hasStacks = !!error.stack;

    if (!hasStacks) {
      // Skip test if environment doesn't support stacks
      expect(true).toBe(true);
      return;
    }

    // Reject the promise
    deferred.reject(error);

    // The promise should have stack information
    const promise = deferred.promise;
    expect(promise.stack).toBeDefined();

    // The stack should contain line number information
    expect(promise.stack).toMatch(/:\d+:\d+/);

    // Return a promise to wait for async operations
    return Q.delay(10);
  });
});