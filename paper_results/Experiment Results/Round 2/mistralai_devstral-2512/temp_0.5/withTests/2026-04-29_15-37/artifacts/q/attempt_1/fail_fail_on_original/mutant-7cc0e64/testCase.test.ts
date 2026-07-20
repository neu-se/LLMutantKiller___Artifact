import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done() behavior with process.domain", () => {
  it("should not bind onUnhandledError to process.domain when process.domain is undefined", async () => {
    // Create a mock process object without a domain property
    const originalProcess = global.process;
    global.process = { ...originalProcess, domain: undefined };

    try {
      const deferred = Q.defer();
      const error = new Error("test error");

      // Track if onUnhandledError was called
      let onUnhandledErrorCalled = false;
      const originalOnUnhandledError = (global.process as any).onUnhandledError;
      (global.process as any).onUnhandledError = function() {
        onUnhandledErrorCalled = true;
      };

      // Call done without a rejection handler
      deferred.promise.done();

      // Reject the promise
      deferred.reject(error);

      // Wait for the next tick to allow the error handler to execute
      await new Promise(resolve => setTimeout(resolve, 10));

      // In the original code, onUnhandledError should NOT be bound to process.domain
      // because process.domain is undefined, so the condition should be false
      // In the mutated code, the condition is always true, which would cause an error
      // when trying to bind to undefined
      expect(onUnhandledErrorCalled).toBe(true);

      // Restore original onUnhandledError
      (global.process as any).onUnhandledError = originalOnUnhandledError;
    } finally {
      // Restore original process
      global.process = originalProcess;
    }
  });
});