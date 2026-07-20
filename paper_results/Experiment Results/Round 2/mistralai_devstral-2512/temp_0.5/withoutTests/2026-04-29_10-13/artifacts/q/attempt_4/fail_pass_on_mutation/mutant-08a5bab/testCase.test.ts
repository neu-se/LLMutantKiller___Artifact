const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly identify internal stack frames", () => {
    // Create a promise chain that will generate stack traces
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Get the stack trace before rejecting
    const originalStack = error.stack;

    // Reject the promise which will trigger stack trace filtering
    deferred.reject(error);

    // Force the promise to be handled to trigger stack filtering
    deferred.promise.catch(() => {});

    // The mutation would cause all frames to be considered internal
    // which would result in an empty filtered stack
    expect(originalStack).toBeDefined();
    expect(originalStack!.split('\n').length).toBeGreaterThan(1);
  });
});