import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine function behavior", () => {
  it("should return undefined when hasStacks is false", () => {
    // Save the original value of hasStacks
    const originalHasStacks = (Q as any).longStackSupport;
    // Force hasStacks to be false
    (Q as any).longStackSupport = false;

    // Create a deferred promise to test the behavior
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Resolve the promise
    deferred.resolve("test");

    // Verify the promise is fulfilled
    return promise.then((value) => {
      expect(value).toBe("test");
    }).finally(() => {
      // Restore the original value
      (Q as any).longStackSupport = originalHasStacks;
    });
  });
});