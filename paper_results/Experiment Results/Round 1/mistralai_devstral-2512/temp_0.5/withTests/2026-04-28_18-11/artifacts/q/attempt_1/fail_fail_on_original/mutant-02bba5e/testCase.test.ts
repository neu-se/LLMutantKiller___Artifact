import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong mutation test", () => {
  it("should properly handle null errors in stack trace generation", async () => {
    // Create a promise chain that will reject with null
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Reject with null
    deferred.reject(null);

    // Force long stack traces to be enabled
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      // Try to catch the rejection and verify the error handling
      await promise.then(
        () => {
          throw new Error("Should not be fulfilled");
        },
        (error) => {
          // The error should be null as we rejected with null
          expect(error).toBe(null);
          return Q.reject(error);
        }
      );
    } finally {
      // Restore original setting
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});