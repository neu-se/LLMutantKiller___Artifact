import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done() error handling", () => {
  it("should handle unhandled errors correctly when process.domain is not available", async () => {
    // Store original process.domain
    const originalDomain = (process as any).domain;

    try {
      // Create a mock process without domain
      const mockProcess = { ...process, domain: undefined };
      (global as any).process = mockProcess;

      const deferred = Q.defer();
      const error = new Error("test error");

      // Track if error was handled
      let errorHandled = false;
      const originalOnError = Q.onerror;
      Q.onerror = (err: any) => {
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

      // Restore original onerror
      Q.onerror = originalOnError;
    } finally {
      // Restore original process
      (global as any).process = process;
      (process as any).domain = originalDomain;
    }
  });
});