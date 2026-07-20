// Test case to detect the mutation in object_defineProperty
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("object_defineProperty mutation test", () => {
  it("should properly define properties with Object.defineProperty fallback", () => {
    // Create a test object to verify property definition
    const testObj: any = {};

    // Force the use of the fallback implementation by temporarily making Object.defineProperty undefined
    const originalDefineProperty = Object.defineProperty;
    Object.defineProperty = undefined;

    try {
      // Create a promise that will trigger the code path using object_defineProperty
      Q.longStackSupport = true;
      const deferred = Q.defer();
      const testError = new Error("test error");

      // This will trigger makeStackTraceLong which uses object_defineProperty
      deferred.promise.then(() => {
        throw testError;
      }).catch((error: any) => {
        // Check if properties were properly defined
        // In original code, __minimumStackCounter__ should be defined
        // In mutated code, it won't be defined because the fallback does nothing
        if (!error.hasOwnProperty('__minimumStackCounter__')) {
          throw new Error("Property not defined - mutation detected");
        }
      });

      deferred.reject(testError);

      return deferred.promise.catch((error: any) => {
        if (error.message === "Property not defined - mutation detected") {
          throw error;
        }
      });
    } finally {
      // Restore original
      Object.defineProperty = originalDefineProperty;
    }
  });
});