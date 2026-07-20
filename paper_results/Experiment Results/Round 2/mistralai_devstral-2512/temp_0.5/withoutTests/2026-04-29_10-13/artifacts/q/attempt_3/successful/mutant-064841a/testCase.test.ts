const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack traces", () => {
  it("should capture stack traces when long stack support is enabled", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will be rejected
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Reject the promise
    deferred.reject(new Error("Test error"));

    // Check that the promise has a stack trace
    const inspectResult = promise.inspect();
    expect(inspectResult.state).toBe("rejected");

    // The mutation removes the stack trace capture logic, so in the mutated version
    // the promise won't have a stack property set
    if (Q.longStackSupport) {
      expect(promise).toHaveProperty("stack");
      expect(typeof promise.stack).toBe("string");
      expect(promise.stack.length).toBeGreaterThan(0);
    }
  });
});