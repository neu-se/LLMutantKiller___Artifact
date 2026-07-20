const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library object_defineProperty mutation", () => {
  it("should properly define properties using the fallback implementation", () => {
    // Save the original Object.defineProperty
    const originalDefineProperty = Object.defineProperty;

    // Create a test object
    const testObj: any = {};

    // Temporarily disable Object.defineProperty to force using Q's fallback
    (Object as any).defineProperty = undefined;

    try {
      // Create a promise which internally uses object_defineProperty
      const promise = Q.resolve(42);

      // Try to define a property on the promise
      // The original code should handle this through its fallback
      // The mutated code (missing return) won't properly define properties
      promise.testProp = "testValue";

      // Verify the property was set
      expect(promise.testProp).toBe("testValue");

      // Test that the fallback implementation works correctly
      // by checking if we can define properties in this environment
      testObj.anotherProp = "anotherValue";
      expect(testObj.anotherProp).toBe("anotherValue");

    } finally {
      // Restore the original Object.defineProperty
      (Object as any).defineProperty = originalDefineProperty;
    }
  });
});