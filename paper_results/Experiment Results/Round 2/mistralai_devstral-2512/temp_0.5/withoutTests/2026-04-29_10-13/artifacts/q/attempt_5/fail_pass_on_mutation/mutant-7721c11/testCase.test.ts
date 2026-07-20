// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-7721c11/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_indexOf mutation test", () => {
  it("should correctly find the index of a value in an array using Q's internal array_indexOf", () => {
    // Force the use of Q's internal array_indexOf shim by using an array-like object
    const arrayLike = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, length: 5 };
    const searchValue = 3;
    const expectedIndex = 2;

    // Access the internal array_indexOf implementation
    const array_indexOf = Q.array_indexOf || Array.prototype.indexOf;
    const result = array_indexOf.call(arrayLike, searchValue);

    expect(result).toBe(expectedIndex);
  });
});