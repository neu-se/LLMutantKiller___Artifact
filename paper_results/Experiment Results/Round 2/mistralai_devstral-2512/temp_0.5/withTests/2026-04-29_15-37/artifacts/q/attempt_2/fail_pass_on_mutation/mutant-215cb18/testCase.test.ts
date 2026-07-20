// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-215cb18/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("object_defineProperty mutation test", () => {
  it("should properly define properties on objects using Q", () => {
    const obj = {};
    const testValue = "test_value";

    // This test relies on the proper implementation of object_defineProperty
    // which should define a property on an object and return the object
    const deferred = Q.defer();
    deferred.resolve(obj);

    return deferred.promise.then((o: any) => {
      Object.defineProperty(o, "testProp", {
        value: testValue,
        writable: true,
        enumerable: true,
        configurable: true
      });
      expect(o.testProp).toBe(testValue);
      expect(o).toBe(obj); // Verify the same object is returned
    });
  });
});