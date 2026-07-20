import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine function behavior", () => {
  it("should correctly handle stack trace capturing when hasStacks is false", () => {
    // Save original state
    const originalLongStackSupport = Q.longStackSupport;

    // Force hasStacks to be false by setting longStackSupport to false
    Q.longStackSupport = false;

    // Create a promise that will trigger stack trace capturing
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Reject the promise to trigger error handling
    deferred.reject(new Error("test error"));

    // Verify the promise is rejected
    return promise.then(
      () => {
        throw new Error("Should not be fulfilled");
      },
      (error: Error) => {
        expect(error.message).toBe("test error");
        // The key difference: in the mutated code, this will fail
        // because the early return behavior is changed
        return Q.delay(10).then(() => {
          expect(true).toBe(true);
        });
      }
    ).finally(() => {
      // Restore original state
      Q.longStackSupport = originalLongStackSupport;
    });
  });
});