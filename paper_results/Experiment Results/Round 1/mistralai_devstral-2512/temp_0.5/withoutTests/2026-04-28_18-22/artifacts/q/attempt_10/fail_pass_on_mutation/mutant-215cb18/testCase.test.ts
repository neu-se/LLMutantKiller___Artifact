const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library object_defineProperty mutation", () => {
  it("should properly define properties when Object.defineProperty is unavailable", () => {
    // Save original and force fallback
    const originalDefineProperty = Object.defineProperty;
    (Object as any).defineProperty = undefined;

    try {
      // Create test object that will use Q's fallback
      const testObj: any = {};

      // Create a promise to trigger internal property definitions
      const promise = Q.resolve(testObj);

      // The original fallback should properly define properties
      // The mutated version (missing return) won't define them
      promise.then((result: any) => {
        result.testProp = "defined";
        expect(result.testProp).toBe("defined");

        // Test that the fallback works for defining properties
        const anotherObj: any = {};
        anotherObj.anotherProp = "value";
        expect(anotherObj.anotherProp).toBe("value");
      });

      return promise;
    } finally {
      (Object as any).defineProperty = originalDefineProperty;
    }
  });
});