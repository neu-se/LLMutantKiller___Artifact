import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.longStackSupport stack capture in defer", () => {
  it("should capture stack trace on deferred promise when longStackSupport is enabled", () => {
    const originalLongStackSupport = Q.longStackSupport;
    try {
      Q.longStackSupport = true;
      const deferred = Q.defer();
      // When longStackSupport is true, the deferred promise should have a stack property
      // set during creation (captured from the defer() call site)
      expect(deferred.promise.stack).toBeDefined();
      expect(typeof deferred.promise.stack).toBe("string");
      expect(deferred.promise.stack.length).toBeGreaterThan(0);
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});