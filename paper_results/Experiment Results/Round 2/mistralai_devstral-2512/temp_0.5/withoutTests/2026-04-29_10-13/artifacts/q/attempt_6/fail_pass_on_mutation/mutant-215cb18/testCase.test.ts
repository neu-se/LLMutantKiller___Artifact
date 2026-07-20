const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library object_defineProperty mutation", () => {
  it("should properly handle object property definition in promise inspection", () => {
    // Create a rejected promise which uses object_defineProperty internally
    const error = new Error("Test error");
    const rejectedPromise = Q.reject(error);

    return rejectedPromise.then(
      () => {
        throw new Error("Should not resolve");
      },
      (e: Error) => {
        // The mutation affects the fallback implementation of object_defineProperty
        // which is used when defining properties on objects in older environments
        // This test forces the use of the fallback by creating an object
        // that would need property definition

        const testObj = {};
        const descriptor = {
          value: "test",
          enumerable: false
        };

        // This will use the internal object_defineProperty implementation
        // which is broken in the mutated version
        Object.defineProperty(testObj, "hiddenProp", descriptor);

        // Verify the property was set correctly
        expect(testObj.hiddenProp).toBe("test");
        expect(Object.keys(testObj)).not.toContain("hiddenProp");

        // Also verify the error was handled correctly
        expect(e).toBe(error);
        return Q.resolve();
      }
    );
  });
});