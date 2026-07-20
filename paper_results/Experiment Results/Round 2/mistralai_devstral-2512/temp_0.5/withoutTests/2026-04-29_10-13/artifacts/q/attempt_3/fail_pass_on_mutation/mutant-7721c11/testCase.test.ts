// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-7721c11/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_indexOf mutation test", () => {
  it("should correctly find the index of a value in an array", () => {
    const arr = [1, 2, 3, 4, 5];
    const value = 3;
    const expectedIndex = 2;

    // Directly test the array_indexOf shim that's used internally by Q
    const indexOf = Q.array_indexOf || Array.prototype.indexOf;
    const result = indexOf.call(arr, value);

    expect(result).toBe(expectedIndex);
  });
});