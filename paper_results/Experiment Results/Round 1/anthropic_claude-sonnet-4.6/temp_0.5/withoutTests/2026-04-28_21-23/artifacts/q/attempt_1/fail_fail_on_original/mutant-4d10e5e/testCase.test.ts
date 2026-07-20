import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("hasStacks initialization", () => {
  it("should not add stack property to deferred promise when hasStacks is false (original)", () => {
    // When hasStacks = false (original), even with longStackSupport enabled,
    // the condition `Q.longStackSupport && hasStacks` is false, so no stack is added.
    // When hasStacks = true (mutated), the condition becomes true and stack IS added.
    
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;
    
    try {
      const deferred = Q.defer();
      // In original code (hasStacks = false): deferred.promise.stack is undefined
      // In mutated code (hasStacks = true): deferred.promise.stack is a string
      expect(deferred.promise.stack).toBeUndefined();
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});