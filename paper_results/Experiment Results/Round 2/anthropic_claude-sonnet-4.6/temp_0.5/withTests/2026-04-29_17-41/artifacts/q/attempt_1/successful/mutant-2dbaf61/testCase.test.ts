import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("hasStacks initialization", () => {
  it("should capture stack traces on deferred promises when longStackSupport is enabled", () => {
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      const deferred = Q.defer();
      // When hasStacks is true (original code), the deferred promise gets a .stack property
      // because the code does: promise.stack = e.stack.substring(...)
      // When hasStacks is false (mutated code), this block is skipped entirely
      expect(typeof deferred.promise.stack).toBe("string");
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});