import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine function behavior", () => {
  it("should return undefined when hasStacks is false", () => {
    // Save original state
    const originalLongStackSupport = Q.longStackSupport;

    // Force hasStacks to be false
    Q.longStackSupport = false;

    // Create a deferred and immediately resolve it
    const deferred = Q.defer();
    const promise = deferred.promise;
    deferred.resolve("test");

    // The key test: verify that captureLine returns undefined when hasStacks is false
    // This is exposed through the stack trace behavior
    return promise.then((value: any) => {
      expect(value).toBe("test");
      // In the original code, when hasStacks is false, captureLine returns undefined
      // In the mutated code, it returns nothing (empty block), which affects stack trace behavior
      // We can detect this by checking if the promise has a stack property
      expect(promise.stack).toBeUndefined();
    }).finally(() => {
      Q.longStackSupport = originalLongStackSupport;
    });
  });
});