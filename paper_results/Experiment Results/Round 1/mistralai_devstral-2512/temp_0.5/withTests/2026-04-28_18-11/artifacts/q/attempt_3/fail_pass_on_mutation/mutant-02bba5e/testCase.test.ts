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

    // Try to catch the rejection and verify the error handling
    return promise.then(
      () => {
        throw new Error("Should not be fulfilled");
      },
      (error: any) => {
        // The error should be null as we rejected with null
        expect(error).toBe(null);
        // Return a resolved promise to avoid unhandled rejection
        return Q.resolve();
      }
    ).finally(() => {
      // Restore original setting
      Q.longStackSupport = originalLongStackSupport;
    });
  });
});