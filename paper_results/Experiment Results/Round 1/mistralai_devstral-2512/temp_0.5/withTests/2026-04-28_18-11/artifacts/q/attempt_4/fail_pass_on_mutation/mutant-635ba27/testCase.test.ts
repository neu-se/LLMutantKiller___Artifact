// Test case to detect the mutation in array_indexOf shim
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_indexOf mutation detection", () => {
  it("should correctly find last index of value in array using array_indexOf shim", () => {
    // Create a test array where the value appears multiple times
    const testArray = [1, 2, 3, 4, 3, 5];
    const valueToFind = 3;

    // The mutation changes i++ to i-- which would cause the loop to find the first occurrence
    // from the end rather than the first from the beginning
    const foundIndex = testArray.indexOf(valueToFind);

    // With original code (i++), should find first occurrence at index 2
    // With mutated code (i--), would find last occurrence at index 4
    expect(foundIndex).toBe(2);
  });
});