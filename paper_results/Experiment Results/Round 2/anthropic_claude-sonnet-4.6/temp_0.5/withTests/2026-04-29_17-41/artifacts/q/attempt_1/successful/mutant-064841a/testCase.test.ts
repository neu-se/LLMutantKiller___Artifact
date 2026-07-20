import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces", () => {
  it("should set stack property on deferred promise when longStackSupport is enabled", async () => {
    Q.longStackSupport = true;

    try {
      const deferred = Q.defer();
      
      // The promise should have a stack property set when longStackSupport is true
      // This is set in the defer() function when longStackSupport && hasStacks
      expect(deferred.promise.stack).toBeDefined();
      expect(typeof deferred.promise.stack).toBe("string");
      expect(deferred.promise.stack.length).toBeGreaterThan(0);
    } finally {
      Q.longStackSupport = false;
    }
  });
});