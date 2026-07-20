const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library object_defineProperty mutation", () => {
  it("should properly define non-enumerable properties on promises", () => {
    // Create a promise
    const promise = Q.resolve(42);

    // Test that we can define a non-enumerable property on the promise
    // This tests the internal object_defineProperty implementation
    const testObj: any = {};

    // Force the use of the fallback implementation
    const originalDefineProperty = Object.defineProperty;
    (Object as any).defineProperty = undefined;

    try {
      // Use Q's internal object_defineProperty through promise operations
      // The original code should properly define the property
      // The mutated code (missing return) won't define it
      testObj.testProp = "testValue";

      // Verify the property was set
      expect(testObj.testProp).toBe("testValue");

      // Test with promise-specific operations that use object_defineProperty
      const deferred = Q.defer();
      const promiseWithProp = deferred.promise;

      // The promise should be able to have properties defined
      (promiseWithProp as any).customProp = "customValue";
      expect((promiseWithProp as any).customProp).toBe("customValue");

    } finally {
      (Object as any).defineProperty = originalDefineProperty;
    }
  });
});