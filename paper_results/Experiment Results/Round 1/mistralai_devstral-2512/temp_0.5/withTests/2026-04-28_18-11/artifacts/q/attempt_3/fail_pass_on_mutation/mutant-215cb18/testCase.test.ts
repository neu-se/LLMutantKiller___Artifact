// Test case to detect the mutation in object_defineProperty
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("object_defineProperty mutation test", () => {
  it("should properly define properties with Object.defineProperty fallback", () => {
    // Create a test object
    const testObj: any = {};

    // Test the fallback implementation by triggering code that uses it
    // We'll test the long stack trace feature which uses object_defineProperty
    Q.longStackSupport = true;

    // Create a promise chain that will trigger the long stack trace code path
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();

    // Create an error that will be used in the promise chain
    const testError = new Error("test error");

    // Set up the promise chain
    deferred1.promise.then(() => {
      return deferred2.promise;
    }).then(() => {
      throw testError;
    }).catch((error: any) => {
      // At this point, the error should have been processed through makeStackTraceLong
      // which uses object_defineProperty to add stack properties

      // Check if the error has the expected properties added by object_defineProperty
      // In the original code, these properties should be defined
      expect(error).toHaveProperty("stack");
      expect(error).toHaveProperty("__minimumStackCounter__");

      // Try to verify the property was actually defined (not just inherited)
      expect(error.hasOwnProperty("__minimumStackCounter__")).toBe(true);
    });

    // Trigger the promise chain
    deferred1.resolve();
    deferred2.reject(testError);

    // Return the promise chain
    return deferred1.promise.catch(() => {
      // Test passed if we get here without errors in original code
      // In mutated code, the property won't be defined properly
    });
  });
});