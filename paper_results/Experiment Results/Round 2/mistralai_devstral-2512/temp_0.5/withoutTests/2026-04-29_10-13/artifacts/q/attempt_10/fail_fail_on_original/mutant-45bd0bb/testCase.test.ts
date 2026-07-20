const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q object creation behavior", () => {
  it("should correctly handle Object.create availability", () => {
    const originalCreate = Object.create;
    let createWasCalled = false;

    try {
      // Override Object.create to track calls
      Object.create = function(prototype: object) {
        createWasCalled = true;
        const F = function() {};
        F.prototype = prototype;
        return new (F as any)();
      };

      // Create a deferred object
      const deferred = Q.defer();
      const promise = deferred.promise;

      // In original code, Object.create should be called when available
      // In mutated code, the fallback is used even when Object.create exists
      expect(createWasCalled).toBe(true);

      // Verify basic functionality
      expect(typeof promise.then).toBe("function");

      // Test promise resolution
      let resolvedValue: unknown = null;
      promise.then((value: unknown) => {
        resolvedValue = value;
      });
      deferred.resolve("test");

      return new Promise<void>((resolve) => {
        setTimeout(() => {
          expect(resolvedValue).toBe("test");
          resolve();
        }, 10);
      });

    } finally {
      Object.create = originalCreate;
    }
  });
});