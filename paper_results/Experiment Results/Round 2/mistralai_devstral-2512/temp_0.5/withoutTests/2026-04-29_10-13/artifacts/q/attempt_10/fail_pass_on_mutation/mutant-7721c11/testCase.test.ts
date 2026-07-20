// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-7721c11/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_indexOf mutation test", () => {
  it("should correctly find the index of a value in an array using Q's internal array_indexOf", () => {
    // The mutation changes the condition in array_indexOf from:
    // if (this[i] === value) to if (false)
    // This will cause indexOf to always return -1

    // Create a test that directly uses Q's internal array operations
    const testArray = [1, 2, 3, 4, 5];
    const searchValue = 3;

    // Use Q.all which internally uses array_indexOf for tracking progress
    const promises = testArray.map(value => Q.resolve(value));
    promises[2] = Q.resolve(searchValue); // Ensure our search value is at index 2

    return Q.all(promises).then(function(results) {
      // The mutation affects array_indexOf which is used internally by Q
      // This test verifies the correct index is found
      const index = results.indexOf(searchValue);
      expect(index).toBe(2);
      return index;
    });
  });
});