const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q object creation", () => {
  it("should properly create objects when Object.create is available", () => {
    // Save the original Object.create
    const originalCreate = Object.create;

    try {
      // Ensure Object.create is available
      Object.create = originalCreate;

      // Create a test object using Q's internal object_create
      const testObj = {};
      const createdObj = Object.create(testObj);

      // Verify the prototype chain is correct
      expect(Object.getPrototypeOf(createdObj)).toBe(testObj);

      // Now test Q's functionality which depends on object_create
      const deferred = Q.defer();
      const promise = deferred.promise;

      // Verify basic functionality
      expect(typeof promise.then).toBe("function");
      expect(typeof deferred.resolve).toBe("function");

      // Test promise resolution
      let resolvedValue = null;
      promise.then((value) => { resolvedValue = value; });
      deferred.resolve("test value");

      // Use setTimeout to allow the promise to resolve
      return new Promise((resolve) => {
        setTimeout(() => {
          expect(resolvedValue).toBe("test value");
          resolve();
        }, 10);
      });

    } finally {
      // Restore Object.create
      Object.create = originalCreate;
    }
  });
});