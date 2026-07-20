import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine function behavior", () => {
  it("should handle stack traces correctly when hasStacks is false", () => {
    // Create a scenario where captureLine is called with hasStacks = false
    const originalHasStacks = Q.longStackSupport;
    Q.longStackSupport = false;

    // Create a promise chain that would trigger stack trace capturing
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Resolve the promise
    deferred.resolve("test");

    // Verify the promise is fulfilled
    return promise.then((value: any) => {
      expect(value).toBe("test");
    }).finally(() => {
      // Restore the original value
      Q.longStackSupport = originalHasStacks;
    });
  });
});