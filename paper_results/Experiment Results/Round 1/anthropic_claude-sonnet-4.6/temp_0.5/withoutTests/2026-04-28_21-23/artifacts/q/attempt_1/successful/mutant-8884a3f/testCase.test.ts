import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.longStackSupport stack capture on defer", () => {
  it("should capture stack trace on promise when longStackSupport is enabled", async () => {
    // Enable long stack support
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      const deferred = Q.defer();
      const promise = deferred.promise;

      // When longStackSupport is true and stacks are available,
      // the deferred promise should have a stack property set
      // (from the placeholder code that captures the stack trace)
      expect(promise.stack).toBeDefined();
      expect(typeof promise.stack).toBe("string");
      expect(promise.stack.length).toBeGreaterThan(0);
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});