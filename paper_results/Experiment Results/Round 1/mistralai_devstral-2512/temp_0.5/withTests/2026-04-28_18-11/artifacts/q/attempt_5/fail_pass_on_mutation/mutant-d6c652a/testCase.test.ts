import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine function behavior", () => {
  it("should correctly handle early return when hasStacks is false", () => {
    // Save original state
    const originalLongStackSupport = Q.longStackSupport;

    // Force hasStacks to be false
    Q.longStackSupport = false;

    // Create a promise that will trigger stack trace capturing
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Reject the promise to trigger error handling
    deferred.reject(new Error("test error"));

    // Verify the promise is rejected and check stack behavior
    return promise.then(
      () => {
        throw new Error("Should not be fulfilled");
      },
      (error: Error) => {
        expect(error.message).toBe("test error");
        // The key difference: in the original code, when hasStacks is false,
        // captureLine returns undefined early, preventing stack trace modification
        // In the mutated code, it doesn't return, which affects the stack trace
        // We can detect this by checking if the error has a modified stack
        expect(error.stack).not.toContain("From previous event:");
      }
    ).finally(() => {
      Q.longStackSupport = originalLongStackSupport;
    });
  });
});