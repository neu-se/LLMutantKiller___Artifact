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

    // Track if makeStackTraceLong was called
    let stackTraceLongCalled = false;
    const originalMakeStackTraceLong = Q.makeStackTraceLong;
    Q.makeStackTraceLong = function(error: any, promise: any) {
      stackTraceLongCalled = true;
      return originalMakeStackTraceLong(error, promise);
    };

    // Try to catch the rejection and verify the error handling
    return promise.then(
      () => {
        throw new Error("Should not be fulfilled");
      },
      (error: any) => {
        // The error should be null as we rejected with null
        expect(error).toBe(null);
        // Verify that makeStackTraceLong was called with null error
        expect(stackTraceLongCalled).toBe(true);
        // Return a resolved promise to avoid unhandled rejection
        return Q.resolve();
      }
    ).finally(() => {
      // Restore original settings
      Q.longStackSupport = originalLongStackSupport;
      Q.makeStackTraceLong = originalMakeStackTraceLong;
    });
  });
});