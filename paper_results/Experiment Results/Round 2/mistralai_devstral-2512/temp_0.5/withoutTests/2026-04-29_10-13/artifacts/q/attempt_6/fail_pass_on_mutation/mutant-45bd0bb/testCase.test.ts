const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q object creation fallback", () => {
  it("should use fallback implementation when Object.create is not available", () => {
    // Save the original Object.create
    const originalCreate = Object.create;

    try {
      // Simulate environment where Object.create is not available
      Object.create = null;

      // Test that Q can still create deferred objects
      const deferred = Q.defer();
      const promise = deferred.promise;

      // Verify the object was created (proving fallback works)
      expect(deferred).toBeDefined();
      expect(promise).toBeDefined();

      // Verify basic promise functionality
      expect(typeof promise.then).toBe("function");
      expect(typeof deferred.resolve).toBe("function");
      expect(typeof deferred.reject).toBe("function");

      // Test promise resolution works with fallback
      let testPassed = false;
      promise.then(() => {
        testPassed = true;
      });
      deferred.resolve("success");

      // Give time for async operations
      return new Promise((resolve) => {
        setTimeout(() => {
          expect(testPassed).toBe(true);
          resolve();
        }, 10);
      });

    } finally {
      // Restore Object.create
      Object.create = originalCreate;
    }
  });
});