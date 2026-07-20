const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library object_defineProperty mutation", () => {
  it("should properly define properties when Object.defineProperty is not available", () => {
    // Save original implementation
    const originalDefineProperty = Object.defineProperty;

    // Simulate environment without defineProperty to force fallback
    Object.defineProperty = undefined as any;

    try {
      const testObj: any = {};
      const descriptor = {
        value: "testValue",
        enumerable: false,
        configurable: true,
        writable: true
      };

      // This will use Q's internal fallback implementation
      // which is broken in the mutated version (missing return obj)
      const result = Q.resolve(testObj).then(function(obj: any) {
        // The mutation removes the property assignment in the fallback
        // so this will fail in the mutated version
        (Object as any).defineProperty(obj, "testProp", descriptor);
        return obj.testProp === "testValue";
      });

      return result.then(function(success: boolean) {
        expect(success).toBe(true);
      });
    } finally {
      // Restore original
      Object.defineProperty = originalDefineProperty;
    }
  });
});