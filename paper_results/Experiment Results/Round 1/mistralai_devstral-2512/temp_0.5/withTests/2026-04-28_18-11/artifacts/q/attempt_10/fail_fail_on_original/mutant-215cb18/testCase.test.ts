// Test case to detect the mutation in object_defineProperty
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("object_defineProperty mutation test", () => {
  it("should properly define properties with Object.defineProperty fallback", () => {
    // Test by directly checking if properties are defined correctly
    // when using the fallback implementation

    // Create a test object
    const testObj: any = {};

    // Test the fallback by temporarily making Object.defineProperty unavailable
    const originalDefineProperty = Object.defineProperty;
    (Object as any).defineProperty = undefined;

    try {
      // Create a promise that will use the fallback path
      Q.longStackSupport = true;
      const deferred = Q.defer();
      const testError = new Error("test error");

      // This will trigger makeStackTraceLong which uses object_defineProperty
      deferred.promise.then(() => {
        throw testError;
      }).catch((error: any) => {
        // Check if the property was defined
        // In original code: error should have __minimumStackCounter__ property
        // In mutated code: the property won't be defined
        if (error.hasOwnProperty('__minimumStackCounter__')) {
          // This is the expected behavior for original code
          return "original";
        } else {
          // This indicates the mutation
          throw new Error("MUTATION_DETECTED");
        }
      });

      deferred.reject(testError);

      return deferred.promise;
    } finally {
      // Restore original
      (Object as any).defineProperty = originalDefineProperty;
    }
  });
});