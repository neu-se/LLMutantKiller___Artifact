const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library object_defineProperty mutation", () => {
  it("should properly define and return object in fallback implementation", () => {
    // Save original implementation
    const originalDefineProperty = Object.defineProperty;

    // Force use of fallback by making defineProperty unavailable
    Object.defineProperty = undefined as any;

    try {
      const testObj: any = {};
      const descriptor = {
        value: "testValue",
        enumerable: false
      };

      // Create a promise that will use the internal object_defineProperty
      return Q.resolve(testObj).then(function(obj: any) {
        // This uses the internal fallback which is broken in mutated version
        const result = (Object as any).defineProperty(obj, "testProp", descriptor);

        // In original code, this should return the object
        // In mutated code, it returns undefined
        expect(result).toBe(obj);
        expect(obj.testProp).toBe("testValue");
      });
    } finally {
      Object.defineProperty = originalDefineProperty;
    }
  });
});