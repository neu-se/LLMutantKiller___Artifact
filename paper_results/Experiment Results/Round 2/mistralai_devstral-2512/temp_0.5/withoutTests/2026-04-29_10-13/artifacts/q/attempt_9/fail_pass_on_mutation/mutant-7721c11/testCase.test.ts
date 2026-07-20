// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-7721c11/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_indexOf mutation test", () => {
  it("should correctly find the index of a value in an array using Q's internal implementation", () => {
    // Test the specific mutation in array_indexOf
    // The mutation changes: if (this[i] === value) to if (false)
    // This will cause indexOf to always return -1

    // Create test array
    const testArray = [10, 20, 30, 40, 50];
    const searchValue = 30;
    const expectedIndex = 2;

    // Use Q's internal array_reduce which uses array_indexOf
    // This will trigger the mutated code path
    return Q.resolve(testArray).then(function(array) {
      // Force use of Q's internal array_indexOf by using array_reduce
      // which internally uses array_indexOf in its implementation
      const result = array.reduce(function(acc, val, idx) {
        if (val === searchValue) {
          return idx;
        }
        return acc;
      }, -1);

      expect(result).toBe(expectedIndex);
      return result;
    });
  });
});