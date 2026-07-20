const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library object_defineProperty mutation", () => {
  it("should properly define properties using object_defineProperty fallback", () => {
    // Create a test object
    const testObj: any = {};

    // Test the fallback implementation by checking if it properly defines properties
    // The mutation removes the return statement, so the property won't be set
    if (typeof Object.defineProperty !== "function") {
      // In environments without Object.defineProperty, Q uses its fallback
      Q.object_defineProperty(testObj, "testProp", {
        value: "testValue",
        enumerable: false
      });

      // Verify the property was set
      expect(testObj.testProp).toBe("testValue");

      // Verify it's not enumerable
      expect(testObj.propertyIsEnumerable("testProp")).toBe(false);
    } else {
      // Test that the fallback path would work if needed
      // We'll test by temporarily making Object.defineProperty unavailable
      const originalDefineProperty = Object.defineProperty;
      (Object as any).defineProperty = undefined;

      try {
        Q.object_defineProperty(testObj, "testProp", {
          value: "testValue",
          enumerable: false
        });

        // Verify the property was set by the fallback
        expect(testObj.testProp).toBe("testValue");
      } finally {
        (Object as any).defineProperty = originalDefineProperty;
      }
    }
  });
});