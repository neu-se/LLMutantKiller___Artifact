const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise stack traces", () => {
  it("should capture stack traces on promise creation when long stack support is enabled", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a deferred promise
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Check that the promise has a stack property when long stack support is enabled
    expect(promise).toHaveProperty('stack');
    expect(typeof promise.stack).toBe('string');
    expect(promise.stack.length).toBeGreaterThan(0);
    expect(promise.stack).toContain('at');
  });
});