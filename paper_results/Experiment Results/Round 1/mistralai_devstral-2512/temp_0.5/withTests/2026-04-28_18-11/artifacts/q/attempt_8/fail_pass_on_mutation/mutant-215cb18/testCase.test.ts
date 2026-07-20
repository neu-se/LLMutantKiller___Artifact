// Test case to detect the mutation in object_defineProperty
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("object_defineProperty mutation test", () => {
  it("should properly define properties with Object.defineProperty fallback", () => {
    // Test by checking if properties are correctly defined on error objects
    // when long stack traces are enabled

    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will trigger makeStackTraceLong
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const testError = new Error("test error");

    // Set up promise chain
    deferred1.promise
      .then(() => deferred2.promise)
      .then(() => {
        throw testError;
      })
      .catch((error: any) => {
        // Check if the error has the expected properties
        // In original code, these should be defined via object_defineProperty
        // In mutated code, they won't be defined properly
        expect(error).toHaveProperty('stack');
        expect(error).toHaveProperty('__minimumStackCounter__');

        // Verify it's an own property (not inherited)
        expect(error.hasOwnProperty('__minimumStackCounter__')).toBe(true);
      });

    // Trigger the chain
    deferred1.resolve();
    deferred2.reject(testError);

    // Return the promise
    return deferred1.promise.catch(() => {
      // Test passed if we get here
    });
  });
});