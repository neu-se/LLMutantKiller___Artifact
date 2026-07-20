// Test case to detect the mutation in object_defineProperty
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_defineProperty mutation test", () => {
  it("should properly define properties with Object.defineProperty fallback", () => {
    // Create a test object
    const testObj: any = {};

    // Test the fallback implementation of object_defineProperty
    const originalDefineProperty = Object.defineProperty;
    Object.defineProperty = undefined;

    // Import the module to get the fallback implementation
    const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");
    const object_defineProperty = qModule.__test_get_object_defineProperty();

    // Test that the fallback properly defines properties
    const result = object_defineProperty(testObj, "testProp", {
      value: "testValue",
      configurable: true,
      enumerable: true,
      writable: true
    });

    // Restore original
    Object.defineProperty = originalDefineProperty;

    // Verify the property was defined correctly
    expect(testObj.testProp).toBe("testValue");
    expect(result).toBe(testObj);
  });
});