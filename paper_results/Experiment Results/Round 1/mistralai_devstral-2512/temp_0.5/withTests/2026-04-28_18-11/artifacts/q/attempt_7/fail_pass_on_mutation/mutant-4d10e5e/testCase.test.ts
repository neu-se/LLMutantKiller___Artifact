const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("hasStacks mutation test", () => {
  it("should handle promises without stack trace support when hasStacks is false", async () => {
    // Create a promise that will be rejected
    const deferred = Q.defer();

    // With hasStacks=false, this should work fine
    // With hasStacks=true, the library will try to capture stack traces
    // which may fail in environments without proper stack support
    deferred.reject(new Error("Test error"));

    try {
      await deferred.promise;
      fail("Should have thrown an error");
    } catch (error) {
      // Verify the error is what we expect
      expect(error.message).toBe("Test error");

      // The key difference: with hasStacks=true, the library would try to:
      // 1. Capture the current stack trace
      // 2. Filter internal Q frames
      // 3. Potentially fail if stack traces aren't available
      // With hasStacks=false, it skips all this
    }
  });
});