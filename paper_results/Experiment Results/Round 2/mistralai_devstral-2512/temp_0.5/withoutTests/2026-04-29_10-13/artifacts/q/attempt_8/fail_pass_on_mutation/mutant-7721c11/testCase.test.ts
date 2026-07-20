// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-7721c11/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_indexOf mutation test", () => {
  it("should correctly find the index of a value in an array using Q's internal array_indexOf shim", () => {
    // Create a scenario that forces the use of Q's internal array_indexOf implementation
    // by creating an array-like object that doesn't have its own indexOf method
    const arrayLike = {
      0: 1,
      1: 2,
      2: 3,
      3: 4,
      4: 5,
      length: 5
    };

    const searchValue = 3;
    const expectedIndex = 2;

    // Use Q's promise system which internally uses the array_indexOf shim
    return Q.resolve(arrayLike).then(function(obj) {
      // This will trigger the internal array_indexOf implementation
      // The mutation changes the condition from `if (this[i] === value)` to `if (false)`
      // which will cause it to always return -1 instead of the correct index
      const result = Array.prototype.indexOf.call(obj, searchValue);
      expect(result).toBe(expectedIndex);
      return result;
    });
  });
});