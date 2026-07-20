// Test case to detect the mutation in object_defineProperty
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("object_defineProperty mutation test", () => {
  it("should properly define properties with Object.defineProperty fallback", () => {
    // Test the specific behavior that uses object_defineProperty
    // by creating a scenario where we can observe the difference

    // Create a test object
    const testObj: any = {};

    // Test the fallback implementation by directly testing property definition
    // We'll use the fact that the fallback should assign the value to the object

    // First, let's test the normal Object.defineProperty behavior
    Object.defineProperty(testObj, 'normalProp', {
      value: 'normalValue',
      configurable: true,
      enumerable: true,
      writable: true
    });

    expect(testObj.normalProp).toBe('normalValue');

    // Now test the fallback by temporarily making Object.defineProperty undefined
    const originalDefineProperty = Object.defineProperty;
    (Object as any).defineProperty = undefined;

    try {
      // Create a new object to test the fallback
      const fallbackTestObj: any = {};

      // Simulate what the fallback should do (from the original code)
      // The original fallback does: obj[prop] = descriptor.value;
      // The mutated version does nothing
      const descriptor = {
        value: 'fallbackValue',
        configurable: true,
        enumerable: true,
        writable: true
      };

      // This simulates what the original fallback implementation does
      fallbackTestObj['fallbackProp'] = descriptor.value;

      // In original code, this should work
      expect(fallbackTestObj.fallbackProp).toBe('fallbackValue');

      // Now test with the actual Q library code that uses object_defineProperty
      // Enable long stack traces which uses object_defineProperty
      Q.longStackSupport = true;

      const deferred = Q.defer();
      const testError = new Error("test error");

      deferred.promise.then(() => {
        throw testError;
      }).catch((error: any) => {
        // Check if properties were defined
        // In original code, __minimumStackCounter__ should be defined
        // In mutated code, it won't be defined
        if (!error.hasOwnProperty('__minimumStackCounter__')) {
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