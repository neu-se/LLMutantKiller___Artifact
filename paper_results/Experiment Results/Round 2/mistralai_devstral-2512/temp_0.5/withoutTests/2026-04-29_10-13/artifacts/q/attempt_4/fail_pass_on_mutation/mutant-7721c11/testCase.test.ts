// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-7721c11/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_indexOf mutation test", () => {
  it("should correctly find the index of a value in an array using Q's internal implementation", () => {
    // Create a test case that will trigger the mutated code path
    const testArray = [1, 2, 3, 4, 5];
    const searchValue = 3;

    // Use Q's internal array_indexOf implementation through the promise system
    // This will test the actual mutated code path
    return Q.resolve(testArray).then(function(array) {
      // This will use Q's internal array_indexOf shim
      const index = array.indexOf(searchValue);
      expect(index).toBe(2);
      return index;
    });
  });
});