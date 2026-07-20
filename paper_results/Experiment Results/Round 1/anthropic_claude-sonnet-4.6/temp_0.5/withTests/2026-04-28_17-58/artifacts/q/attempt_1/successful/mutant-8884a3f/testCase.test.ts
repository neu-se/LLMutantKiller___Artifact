import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack support sets stack on deferred promise", () => {
  it("should set the stack property on a deferred promise when longStackSupport is enabled", () => {
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      const deferred = Q.defer();
      // When longStackSupport is true and hasStacks is true (which it is in Node.js),
      // the promise should have a stack property set
      expect(typeof deferred.promise.stack).toBe("string");
      expect(deferred.promise.stack.length).toBeGreaterThan(0);
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});