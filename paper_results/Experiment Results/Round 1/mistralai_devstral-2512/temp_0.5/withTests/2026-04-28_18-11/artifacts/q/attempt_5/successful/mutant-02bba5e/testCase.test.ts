import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong mutation test", () => {
  it("should properly handle null errors in stack trace generation", () => {
    // Create a promise chain that will reject with null
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Reject with null
    deferred.reject(null);

    // Force long stack traces to be enabled
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    // Track if the error was properly handled
    let errorHandledCorrectly = false;

    // Try to catch the rejection and verify the error handling
    return promise.then(
      () => {
        throw new Error("Should not be fulfilled");
      },
      (error: any) => {
        // The error should be null as we rejected with null
        expect(error).toBe(null);

        // Create a new promise to test stack trace generation with null
        const newDeferred = Q.defer();
        const newPromise = newDeferred.promise;

        // Reject with null again to trigger makeStackTraceLong
        newDeferred.reject(null);

        return newPromise.then(
          () => {
            throw new Error("Should not be fulfilled");
          },
          (newError: any) => {
            // Verify the error is still null
            expect(newError).toBe(null);
            errorHandledCorrectly = true;
          }
        );
      }
    ).then(() => {
      // Verify the error was handled correctly
      expect(errorHandledCorrectly).toBe(true);
    }).finally(() => {
      // Restore original setting
      Q.longStackSupport = originalLongStackSupport;
    });
  });
});