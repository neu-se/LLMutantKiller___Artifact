const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q object creation with Object.create", () => {
  it("should correctly use Object.create when available", () => {
    // Save the original Object.create
    const originalCreate = Object.create;

    try {
      // Ensure Object.create is available
      Object.create = originalCreate;

      // Create a test to verify object creation behavior
      const testProto = { testProp: "value" };
      const createdObj = Object.create(testProto);

      // Verify the object was created with correct prototype
      expect(Object.getPrototypeOf(createdObj)).toBe(testProto);
      expect(createdObj.testProp).toBe("value");

      // Now test Q's deferred which uses object_create internally
      const deferred = Q.defer();
      const promise = deferred.promise;

      // Verify the promise has correct prototype chain
      expect(Object.getPrototypeOf(promise)).toBe(Q.resolve().constructor.prototype);

      // Test that the promise can be resolved
      let resolutionValue = null;
      promise.then(value => {
        resolutionValue = value;
      });
      deferred.resolve("test");

      // Return a promise to handle async nature
      return new Promise(resolve => {
        setTimeout(() => {
          expect(resolutionValue).toBe("test");
          resolve();
        }, 10);
      });

    } finally {
      Object.create = originalCreate;
    }
  });
});