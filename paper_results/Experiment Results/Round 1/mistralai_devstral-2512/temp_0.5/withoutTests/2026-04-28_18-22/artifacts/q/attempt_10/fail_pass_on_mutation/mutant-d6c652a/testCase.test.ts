const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace capture", () => {
  it("should properly handle early return in captureLine when hasStacks is false", () => {
    // This test directly targets the mutation in the captureLine function
    // The mutation changes `if (!hasStacks) { return; }` to `if (!hasStacks) {}`

    // Save original state
    const originalHasStacks = Q.longStackSupport;

    try {
      // Force hasStacks to be false
      Q.longStackSupport = false;

      // Create multiple promises to increase chance of exposing the mutation
      const promises = [];
      for (let i = 0; i < 10; i++) {
        const deferred = Q.defer();
        promises.push(deferred.promise);
        deferred.resolve(i);
      }

      // The mutation affects the captureLine function which is called during each defer()
      // In the original code, when hasStacks is false, it returns early
      // In the mutated code, it continues execution which could cause issues

      return Q.all(promises).then((values) => {
        expect(values).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // Verify all promises have undefined stack when hasStacks is false
        values.forEach((_, i) => {
          expect(promises[i].stack).toBeUndefined();
        });
      });
    } finally {
      Q.longStackSupport = originalHasStacks;
    }
  });
});