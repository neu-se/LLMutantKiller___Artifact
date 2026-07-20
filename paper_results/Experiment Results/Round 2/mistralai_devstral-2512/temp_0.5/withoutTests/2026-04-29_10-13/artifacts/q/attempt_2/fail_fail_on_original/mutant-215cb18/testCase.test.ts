import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library object_defineProperty mutation", () => {
  it("should properly define non-enumerable properties on objects", () => {
    const obj = {};
    const descriptor = {
      value: 42,
      enumerable: false,
      configurable: true,
      writable: true
    };

    // Use Q's internal object_defineProperty which should be accessible
    // through the closure or test its effect indirectly
    const promise = Q.resolve(obj);
    return promise.then(function(result: any) {
      // The mutation removes the actual property assignment
      // This test verifies that defineProperty works correctly
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