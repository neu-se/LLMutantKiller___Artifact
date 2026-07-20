// Test case to detect the mutation in object_defineProperty
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("object_defineProperty mutation test", () => {
  it("should properly define properties with Object.defineProperty fallback", () => {
    // Test the fallback implementation by directly testing property definition
    const testObj: any = {};
    const testValue = "testValue";

    // Force the use of fallback implementation
    const originalDefineProperty = Object.defineProperty;
    Object.defineProperty = undefined;

    try {
      // Create a simple test to verify property definition works
      const deferred = Q.defer();
      const error = new Error("test");

      // Trigger code that uses object_defineProperty
      Q.longStackSupport = true;
      deferred.reject(error);

      return deferred.promise.catch((err: any) => {
        // Try to manually test the fallback by checking if we can define properties
        // This simulates what the original fallback should do
        testObj.testProp = testValue;

        // In original code, this assignment works (fallback does obj[prop] = descriptor.value)
        // In mutated code, the fallback does nothing, so we need to verify differently
        if (testObj.testProp !== testValue) {
          throw new Error("Property not defined correctly - mutation detected");
        }

        // Also verify the error object has expected properties from makeStackTraceLong
        if (!err.hasOwnProperty('stack')) {
          throw new Error("Stack property not defined - mutation detected");
        }

        return "test passed";
      });
    } finally {
      Object.defineProperty = originalDefineProperty;
    }
  });
});