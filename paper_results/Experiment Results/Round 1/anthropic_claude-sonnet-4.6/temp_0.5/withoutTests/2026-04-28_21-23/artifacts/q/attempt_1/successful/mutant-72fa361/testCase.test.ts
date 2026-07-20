import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
  it("should augment error stack traces with promise chain information when longStackSupport is enabled", async () => {
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      let capturedError: Error | null = null;

      // Create a deferred promise chain that will capture the error
      const deferred = Q.defer();

      // Set up a rejection handler that captures the error
      const resultPromise = deferred.promise.then(function step1() {
        return Q.reject(new Error("test error"));
      });

      // Resolve the deferred to trigger the chain
      deferred.resolve("start");

      // Wait for the rejection and capture the error
      await resultPromise.then(null, function (err: Error) {
        capturedError = err;
      });

      expect(capturedError).not.toBeNull();
      expect(capturedError!.stack).toBeDefined();
      
      // The original makeStackTraceLong should add "From previous event:" to the stack
      // The mutated version (empty function) will NOT add this separator
      expect(capturedError!.stack).toContain("From previous event:");
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});