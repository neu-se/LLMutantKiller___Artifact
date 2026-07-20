import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack support - defer promise stack property", () => {
  it("should set the stack property on a deferred promise when longStackSupport is enabled", () => {
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      const deferred = Q.defer();
      // In the original code, the deferred promise should have a stack property
      // because the `if (Q.longStackSupport && hasStacks)` block runs.
      // In the mutated code, `if (false)` means this block never runs,
      // so the promise will NOT have a stack property.
      expect(typeof deferred.promise.stack).toBe("string");
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});