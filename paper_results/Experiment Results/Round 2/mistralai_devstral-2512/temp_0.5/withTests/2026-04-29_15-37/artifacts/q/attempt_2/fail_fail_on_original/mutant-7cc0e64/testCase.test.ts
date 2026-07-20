import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done() process.domain binding", () => {
  it("should handle errors correctly when process.domain is undefined", async () => {
    // Store original process.domain if it exists
    const originalDomain = process.domain;

    try {
      // Set process.domain to undefined to test the condition
      (process as any).domain = undefined;

      const deferred = Q.defer();
      const error = new Error("test error");

      // Track if error was handled
      let errorHandled = false;
      Q.onerror = (err) => {
        errorHandled = true;
        expect(err).toBe(error);
      };

      // Call done without a rejection handler
      deferred.promise.done();

      // Reject the promise
      deferred.reject(error);

      // Wait for the error handler to execute
      await new Promise(resolve => setTimeout(resolve, 50));

      // The error should be handled by Q.onerror
      expect(errorHandled).toBe(true);

    } finally {
      // Restore original process.domain
      (process as any).domain = originalDomain;
      Q.onerror = null;
    }
  });
});