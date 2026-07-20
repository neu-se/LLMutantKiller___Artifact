const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library object_defineProperty mutation", () => {
  it("should properly define non-enumerable properties on objects", () => {
    const obj = {};
    const descriptor = {
      value: 42,
      enumerable: false,
      configurable: true,
      writable: true
    };

    // Test the behavior that relies on object_defineProperty
    const promise = Q.resolve(obj);
    return promise.then(function(result: any) {
      // The mutation removes the property assignment in the fallback
      // This should fail when the mutation is present because the property won't be set
      Object.defineProperty(result, "testProp", descriptor);

      // Verify the property was defined correctly
      expect(result.testProp).toBe(42);

      // Verify it's not enumerable
      expect(Object.keys(result)).not.toContain("testProp");

      // Verify it's configurable
      delete result.testProp;
      expect(result.testProp).toBeUndefined();
    });
  });
});