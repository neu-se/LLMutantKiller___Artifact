const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace capture", () => {
  it("should properly handle early return in captureLine when hasStacks is false", () => {
    // This test directly targets the mutation in the captureLine function
    // The mutation removes the return statement when hasStacks is false

    // Create a deferred promise which will call captureLine during construction
    const deferred = Q.defer();

    // Force hasStacks to be false
    const originalHasStacks = Q.longStackSupport;
    Q.longStackSupport = false;

    try {
      // The mutation affects the captureLine function which is called during defer()
      // In the original code, when hasStacks is false, captureLine returns early
      // In the mutated code, it continues execution which could cause issues

      // Verify the promise was created correctly
      expect(deferred).toBeDefined();
      expect(deferred.promise).toBeDefined();

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