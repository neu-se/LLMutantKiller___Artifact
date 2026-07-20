const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace capture", () => {
  it("should properly handle stack trace capture when hasStacks is false", () => {
    // This test targets the specific mutation in the captureLine function
    // The mutation removes the return statement when hasStacks is false

    // Save original state
    const originalHasStacks = Q.longStackSupport;

    try {
      // Force hasStacks to be false
      Q.longStackSupport = false;

      // Create a promise that will trigger stack trace capture
      const deferred = Q.defer();

      // The mutation affects the captureLine function which is called during defer()
      // In the original code, when hasStacks is false, it returns early
      // In the mutated code, it continues execution which could cause issues

      // Verify the promise was created correctly
      expect(deferred).toBeDefined();
      expect(deferred.promise).toBeDefined();

      // Check that stack is undefined when hasStacks is false
      expect(deferred.promise.stack).toBeUndefined();

      // Resolve the promise
      deferred.resolve("test value");

      return deferred.promise.then((value) => {
        expect(value).toBe("test value");
      });
    } finally {
      Q.longStackSupport = originalHasStacks;
    }
  });
});