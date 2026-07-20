// Test case to detect the mutation in object_defineProperty
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("object_defineProperty mutation test", () => {
  it("should properly define properties with Object.defineProperty fallback", () => {
    // Create a test object
    const testObj: any = {};

    // Force the use of fallback implementation
    const originalDefineProperty = Object.defineProperty;
    Object.defineProperty = undefined;

    try {
      // Enable long stack traces which uses object_defineProperty
      Q.longStackSupport = true;

      // Create a promise that will trigger makeStackTraceLong
      const deferred = Q.defer();
      const testError = new Error("test error");

      // This will trigger the code path that uses object_defineProperty
      deferred.promise.then(() => {
        throw testError;
      }).catch((error: any) => {
        // In original code, the error should have __minimumStackCounter__ property
        // In mutated code, the property won't be defined because fallback does nothing
        if (error.hasOwnProperty('__minimumStackCounter__')) {
          // Property exists - this is the original behavior
          return "original";
        } else {
          // Property doesn't exist - this indicates the mutation
          throw new Error("MUTATION_DETECTED");
        }
      });

      deferred.reject(testError);

      return deferred.promise;
    } finally {
      // Restore original
      Object.defineProperty = originalDefineProperty;
    }
  });
});