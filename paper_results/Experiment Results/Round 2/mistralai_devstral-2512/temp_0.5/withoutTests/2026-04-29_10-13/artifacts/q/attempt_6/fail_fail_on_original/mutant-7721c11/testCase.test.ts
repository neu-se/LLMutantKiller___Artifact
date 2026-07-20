// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-7721c11/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_indexOf mutation test", () => {
  it("should correctly find the index of a value in an array using Q's internal implementation", () => {
    // Create a test that will specifically trigger the mutated code
    const testArray = [1, 2, 3, 4, 5];
    const searchValue = 3;

    // Access the internal array_indexOf implementation directly
    // The mutation changes the condition from `if (this[i] === value)` to `if (false)`
    // which will cause indexOf to always return -1
    const array_indexOf = Q.array_indexOf;

    // This should find the value at index 2 in original code
    // but return -1 in mutated code
    const result = array_indexOf.call(testArray, searchValue);

    expect(result).toBe(2);
  });
});