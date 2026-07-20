// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-215cb18/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("object_defineProperty mutation test", () => {
  it("should properly define and retrieve properties using Q's promise chain", () => {
    const obj = {};
    const testValue = "test_value";

    // This test specifically targets the object_defineProperty shim
    // which in the mutated version doesn't return the object
    return Q.fcall(() => {
      const result = Object.defineProperty(obj, "testProp", {
        value: testValue,
        writable: true,
        enumerable: true,
        configurable: true
      });
      // The original implementation returns the object, the mutated one doesn't
      expect(result).toBe(obj);
      expect(obj.testProp).toBe(testValue);
    });
  });
});