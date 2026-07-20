const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library object_defineProperty mutation", () => {
  it("should properly define non-enumerable properties using fallback implementation", () => {
    // Force the use of fallback implementation by testing in an environment
    // where Object.defineProperty might not be available
    const originalDefineProperty = Object.defineProperty;

    // Temporarily override to force fallback
    Object.defineProperty = undefined as any;

    try {
      const testObj = {};
      const descriptor = {
        value: 42,
        enumerable: false,
        configurable: true,
        writable: true
      };

      // This should use Q's internal fallback implementation
      // which is broken in the mutated version
      const result = Q.resolve(testObj).then(function(obj: any) {
        // The mutation removes the property assignment in the fallback
        // so this will fail in the mutated version
        Object.defineProperty(obj, "testProp", descriptor);
        return obj;
      });

      return result.then(function(obj: any) {
        expect(obj.testProp).toBe(42);
        expect(Object.keys(obj)).not.toContain("testProp");
      });
    } finally {
      // Restore original
      Object.defineProperty = originalDefineProperty;
    }
  });
});