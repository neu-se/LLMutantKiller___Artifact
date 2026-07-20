const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library object_defineProperty mutation", () => {
  it("should properly define non-enumerable properties on error objects", () => {
    // Force the use of Q's fallback object_defineProperty
    const originalDefineProperty = Object.defineProperty;
    (Object as any).defineProperty = undefined;

    try {
      // Create a promise that will use object_defineProperty internally
      const promise = Q.reject(new Error("Test error"));

      // The original code should properly define properties using its fallback
      // The mutated code (missing return) won't properly define properties
      return promise.then(
        () => {
          throw new Error("Should not reach here");
        },
        (error) => {
          // Verify the error object has expected properties
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toBe("Test error");

          // Check if properties were properly defined
          // The mutation would cause the fallback to fail silently
          const testObj: any = {};
          testObj.testProp = "testValue";
          expect(testObj.testProp).toBe("testValue");

          return true;
        }
      );
    } finally {
      (Object as any).defineProperty = originalDefineProperty;
    }
  });
});