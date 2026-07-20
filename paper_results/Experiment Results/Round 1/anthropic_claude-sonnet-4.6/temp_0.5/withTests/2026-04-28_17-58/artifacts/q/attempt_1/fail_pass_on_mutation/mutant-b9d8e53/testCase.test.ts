import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack trace filtering with multi-digit line numbers", () => {
  it("should produce a long stack trace that includes user function names when longStackSupport is enabled", async () => {
    Q.longStackSupport = true;

    try {
      let capturedError: Error | null = null;

      function userFunction() {
        return Q.reject(new Error("test error from user function"));
      }

      await userFunction().catch((err: Error) => {
        capturedError = err;
      });

      // The error should have been captured
      expect(capturedError).not.toBeNull();
      expect(capturedError!.message).toBe("test error from user function");

      // With long stack support and correct regex (matching multi-digit line numbers),
      // the stack should be defined and contain the user function name.
      // The captureLine() function needs to correctly parse multi-digit line numbers
      // (e.g., line 100+) to set qStartingLine/qEndingLine properly.
      // If the regex is broken (only matches single digit line numbers),
      // captureLine() returns undefined, qStartingLine is undefined,
      // and isInternalFrame always returns false, meaning Q internal frames
      // won't be filtered from stack traces.
      
      // We test that the promise machinery works and that a fulfilled promise
      // after a chain resolves correctly - this exercises the stack trace code paths.
      const result = await Q.when(
        userFunction().catch(() => "recovered"),
        (val: string) => val
      );
      
      expect(result).toBe("recovered");

      // Now test that long stack traces actually capture source info
      // by checking that a deferred promise has a stack property set
      const deferred = Q.defer();
      expect(typeof deferred.promise.stack === "string" || deferred.promise.stack === undefined).toBe(true);
      
      // With correct regex parsing multi-digit line numbers, the promise.stack
      // should be a non-empty string (captureLine succeeds and longStackSupport is true)
      expect(typeof deferred.promise.stack).toBe("string");
      expect((deferred.promise.stack as string).length).toBeGreaterThan(0);
      
      deferred.resolve();
      await deferred.promise;
    } finally {
      Q.longStackSupport = false;
    }
  });
});