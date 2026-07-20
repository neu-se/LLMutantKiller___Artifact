const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q object creation", () => {
  it("should properly create objects when Object.create is not available", () => {
    // Save the original Object.create
    const originalCreate = Object.create;

    // Simulate an environment where Object.create is not available
    Object.create = undefined;

    try {
      // This should work with the original code's fallback implementation
      const deferred = Q.defer();
      const promise = deferred.promise;

      // Verify basic functionality still works
      expect(typeof promise.then).toBe("function");
      expect(typeof deferred.resolve).toBe("function");
      expect(typeof deferred.reject).toBe("function");

      // Test that promises can be resolved
      let resolved = false;
      promise.then(() => { resolved = true; });
      deferred.resolve("test");
      expect(resolved).toBe(true);

    } finally {
      // Restore Object.create
      Object.create = originalCreate;
    }
  });
});