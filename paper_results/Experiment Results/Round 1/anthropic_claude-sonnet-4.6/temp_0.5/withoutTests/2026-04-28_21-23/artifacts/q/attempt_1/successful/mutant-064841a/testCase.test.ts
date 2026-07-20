import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support - promise stack capture", () => {
  it("should capture stack trace on deferred promise when longStackSupport is enabled", async () => {
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      const deferred = Q.defer();
      
      // The stack should be captured at defer() creation time when longStackSupport is true
      // The promise.stack property should be set
      const promise = deferred.promise;
      
      // In the original code, promise.stack is set when longStackSupport && hasStacks
      // In the mutated code, the if block is empty so promise.stack is never set
      expect(promise.stack).toBeDefined();
      expect(typeof promise.stack).toBe("string");
      expect(promise.stack.length).toBeGreaterThan(0);
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});