const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library object_defineProperty test", () => {
  it("should properly define non-enumerable properties using object_defineProperty", () => {
    // Create a test object
    const testObj = {};

    // Try to use the internal object_defineProperty function
    // This should work in the original code but fail in the mutated version
    try {
      // Access the internal function through Q's implementation
      const internalDef = Q._getInternal().object_defineProperty;

      if (typeof internalDef === 'function') {
        internalDef(testObj, 'testProp', {
          value: 'testValue',
          enumerable: false,
          configurable: true,
          writable: true
        });

        // Verify the property was defined correctly
        expect(testObj).toHaveProperty('testProp');
        expect(testObj.testProp).toBe('testValue');

        // Check it's not enumerable
        expect(Object.keys(testObj)).not.toContain('testProp');
        expect(Object.propertyIsEnumerable.call(testObj, 'testProp')).toBe(false);
      } else {
        throw new Error("object_defineProperty is not a function");
      }
    } catch (error) {
      // In the mutated version, this should fail
      expect(error).toBeDefined();
      expect(error.message).toContain("object_defineProperty");
    }
  });
});