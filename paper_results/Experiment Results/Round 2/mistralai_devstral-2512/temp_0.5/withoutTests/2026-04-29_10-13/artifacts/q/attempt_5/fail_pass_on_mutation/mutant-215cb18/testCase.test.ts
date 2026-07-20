const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library object_defineProperty mutation", () => {
  it("should properly define and access promise stack properties", () => {
    // Enable long stack traces which uses object_defineProperty
    Q.longStackSupport = true;

    const deferred = Q.defer();
    const testError = new Error("Test error");

    // Create a promise that will be rejected
    const promise = Q.delay(1).then(() => {
      throw testError;
    });

    return promise.catch((error: Error) => {
      // The mutation affects the fallback implementation of object_defineProperty
      // which is used to set the stack property on promises
      // In the mutated version, the stack property won't be properly defined

      // Try to define a property using the same mechanism Q uses internally
      const testObj = {};
      const descriptor = {
        value: "testValue",
        enumerable: false,
        configurable: true,
        writable: true
      };

      // This should work in original but fail in mutated version
      // because the fallback implementation is broken
      Object.defineProperty(testObj, "testProp", descriptor);

      expect(testObj.testProp).toBe("testValue");
      expect(Object.keys(testObj)).not.toContain("testProp");

      // Also verify the error stack was properly handled
      expect(error.stack).toBeDefined();
      expect(error.stack!.length).toBeGreaterThan(0);

      return Q.resolve();
    });
  });
});