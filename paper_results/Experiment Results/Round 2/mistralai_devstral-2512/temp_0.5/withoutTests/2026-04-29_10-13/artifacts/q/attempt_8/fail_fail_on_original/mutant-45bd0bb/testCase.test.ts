const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q object creation fallback behavior", () => {
  it("should fail when Object.create is available but fallback is incorrectly used", () => {
    // Save the original Object.create
    const originalCreate = Object.create;

    try {
      // Make Object.create available but track if it's called
      let createCalled = false;
      Object.create = function(prototype) {
        createCalled = true;
        const F = function() {};
        F.prototype = prototype;
        return new F();
      };

      // Create a deferred object
      const deferred = Q.defer();

      // In the original code, when Object.create is available, it should be used
      // In the mutated code, the fallback is incorrectly used even when Object.create exists
      // This test verifies the correct implementation is used
      expect(createCalled).toBe(true);

      // Verify basic functionality still works
      const promise = deferred.promise;
      expect(typeof promise.then).toBe("function");

      // Test promise resolution
      let testValue = null;
      promise.then(value => {
        testValue = value;
      });
      deferred.resolve("test");

      return new Promise(resolve => {
        setTimeout(() => {
          expect(testValue).toBe("test");
          resolve();
        }, 10);
      });

    } finally {
      Object.create = originalCreate;
    }
  });
});