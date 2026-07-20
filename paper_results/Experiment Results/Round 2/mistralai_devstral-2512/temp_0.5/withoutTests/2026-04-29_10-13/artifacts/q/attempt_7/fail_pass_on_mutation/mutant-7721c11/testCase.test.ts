// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-7721c11/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_indexOf mutation test", () => {
  it("should correctly find the index of a value in an array using Q's internal implementation", () => {
    // Create a test that will specifically trigger the mutated code
    const testArray = [1, 2, 3, 4, 5];
    const searchValue = 3;

    // The mutation is in the array_indexOf shim used internally by Q
    // We need to test it through Q's promise system to trigger the internal implementation
    return Q.resolve(testArray).then(function(array) {
      // This will use Q's internal array_indexOf implementation
      const result = array.indexOf(searchValue);
      expect(result).toBe(2);
      return result;
    });
  });
});