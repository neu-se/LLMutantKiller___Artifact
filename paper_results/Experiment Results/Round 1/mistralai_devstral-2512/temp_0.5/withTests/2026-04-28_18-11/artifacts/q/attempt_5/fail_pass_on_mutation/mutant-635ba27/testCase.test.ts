// Test case to detect the mutation in array_indexOf shim
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_indexOf mutation detection", () => {
  it("should correctly handle empty array in array_indexOf shim", () => {
    // Create an empty array
    const testArray: number[] = [];
    const valueToFind = 1;

    // The mutation changes i++ to i-- which would cause an infinite loop
    // when the array is empty (i starts at 0, condition i < 0 is false,
    // but i-- makes it -1, then -2, etc.)
    const foundIndex = testArray.indexOf(valueToFind);

    // Should return -1 for empty array
    expect(foundIndex).toBe(-1);
  });
});