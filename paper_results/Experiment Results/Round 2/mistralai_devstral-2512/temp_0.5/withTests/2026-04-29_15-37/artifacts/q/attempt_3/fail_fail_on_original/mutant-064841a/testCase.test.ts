const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Long Stack Traces", () => {
  it("should capture stack traces when long stack support is enabled", async () => {
    // Enable long stack support
    Q.longStackSupport = true;

    // Create a deferred promise
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Reject the promise
    deferred.reject(new Error("Test error"));

    try {
      await promise;
      // This should not be reached
      expect(true).toBe(false);
    } catch (error: any) {
      // Check if stack trace was captured on the promise object
      // The original code should set promise.stack, the mutated code won't
      expect(promise.stack).toBeDefined();
      expect(promise.stack).toContain("Test error");
    } finally {
      // Clean up
      Q.longStackSupport = false;
    }
  });
});