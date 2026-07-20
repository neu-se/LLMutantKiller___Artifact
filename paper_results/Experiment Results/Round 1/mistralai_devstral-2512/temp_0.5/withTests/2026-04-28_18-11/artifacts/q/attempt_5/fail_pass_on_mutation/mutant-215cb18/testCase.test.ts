// Test case to detect the mutation in object_defineProperty
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("object_defineProperty mutation test", () => {
  it("should properly define properties with Object.defineProperty fallback", () => {
    // Create a test object
    const testObj: any = {};

    // Test the fallback implementation directly by triggering the code path
    // that uses object_defineProperty when Object.defineProperty is not available
    const originalDefineProperty = Object.defineProperty;

    // Force fallback by making Object.defineProperty undefined
    Object.defineProperty = undefined;

    try {
      // Enable long stack traces which uses object_defineProperty
      Q.longStackSupport = true;

      // Create a promise chain that will trigger makeStackTraceLong
      const deferred = Q.defer();
      const testError = new Error("test error");

      // This will trigger the code path that uses object_defineProperty
      deferred.promise.then(() => {
        throw testError;
      }).catch((error: any) => {
        // Verify the property was defined
        // In original code: error should have __minimumStackCounter__ property
        // In mutated code: the property won't be defined (fallback does nothing)
        if (!error.hasOwnProperty('__minimumStackCounter__')) {
          throw new Error("MUTATION_DETECTED");
        }
      });

      deferred.reject(testError);

      return deferred.promise.catch((error: any) => {
        if (error.message === "MUTATION_DETECTED") {
          throw error;
        }
      });
    } finally {
      // Restore original
      Object.defineProperty = originalDefineProperty;
    }
  });
});