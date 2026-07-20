const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("makeStackTraceLong mutation test", () => {
  it("should properly concatenate stack traces for long stack support", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a chain of promises that will be rejected
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();

    // Set up the promise chain
    const promise1 = deferred1.promise;
    const promise2 = promise1.then(() => {
      return deferred2.promise;
    });

    // Reject the first promise
    const error = new Error("Test error");
    deferred1.reject(error);

    // Wait for the rejection to propagate
    try {
      await promise2;
      fail("Promise should have been rejected");
    } catch (rejection: any) {
      // Check that the stack trace has been properly concatenated
      expect(rejection.stack).toBeDefined();
      expect(rejection.stack).toContain("From previous event:");
      expect(rejection.stack).toContain("Test error");
    }
  });
});