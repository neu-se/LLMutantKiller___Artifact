// Test case to detect the mutation in makeStackTraceLong function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("makeStackTraceLong mutation test", () => {
  it("should preserve stack traces when long stack support is enabled", (done) => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a chain of promises that will reject
    const error = new Error("Test error");
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();

    // Create a promise chain with multiple levels
    const promiseChain = Q().then(() => {
      return deferred1.promise;
    }).then(() => {
      return deferred2.promise;
    });

    // Set up error handling
    promiseChain.fail((e: any) => {
      // Check that the error has a stack trace with multiple frames
      expect(e).toBeDefined();
      expect(e.stack).toBeDefined();
      expect(e.stack.split('\n').length).toBeGreaterThan(2);
      expect(e.stack).toContain("From previous event");
      done();
    });

    // Reject the promises to trigger the error path
    deferred1.reject(error);
    deferred2.reject(error);
  });
});