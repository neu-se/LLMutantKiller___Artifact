import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("hasStacks behavior", () => {
  it("should not attach stack property to deferred promise when longStackSupport is enabled (hasStacks is false by default)", () => {
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      const deferred = Q.defer();
      // In the original code, hasStacks = false, so even with longStackSupport = true,
      // the condition `if (Q.longStackSupport && hasStacks)` is false,
      // and promise.stack should NOT be set.
      // In the mutated code, hasStacks = true, so promise.stack WILL be set.
      expect((deferred.promise as any).stack).toBeUndefined();
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});