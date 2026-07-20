// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-215cb18/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("object_defineProperty mutation test", () => {
  it("should properly chain object_defineProperty calls", () => {
    // This test specifically targets the return value of object_defineProperty
    // The original returns the object, allowing chaining
    // The mutated version returns undefined, breaking chaining

    const testObj = {};

    return Q.fcall(() => {
      // Test chaining object_defineProperty calls
      // This will fail in the mutated version because the first call returns undefined
      const result = Object.defineProperty(
        Object.defineProperty(testObj, "prop1", {
          value: "value1",
          configurable: true
        }),
        "prop2",
        {
          value: "value2",
          configurable: true
        }
      );

      // In original code, result should be testObj
      // In mutated code, result will be undefined (from first call)
      expect(result).toBe(testObj);
      expect(testObj.prop1).toBe("value1");
      expect(testObj.prop2).toBe("value2");
    });
  });
});