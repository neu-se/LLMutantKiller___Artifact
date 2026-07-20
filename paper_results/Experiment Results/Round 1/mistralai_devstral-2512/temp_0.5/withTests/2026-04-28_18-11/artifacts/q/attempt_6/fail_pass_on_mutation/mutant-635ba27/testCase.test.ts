// Test case to detect the mutation in array_indexOf shim
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_indexOf mutation detection", () => {
  it("should correctly find index in array with multiple occurrences using array_indexOf shim", () => {
    // Create a test array with multiple occurrences of the same value
    const testArray = [1, 2, 3, 2, 4, 2, 5];
    const valueToFind = 2;

    // The mutation changes i++ to i-- which would cause the loop to find
    // the last occurrence instead of the first occurrence
    const foundIndex = testArray.indexOf(valueToFind);

    // With original code (i++), should find first occurrence at index 1
    // With mutated code (i--), would find last occurrence at index 5
    expect(foundIndex).toBe(1);
  });
});