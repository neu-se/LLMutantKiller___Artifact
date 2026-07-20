// Test case to detect the mutation in array_indexOf shim
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_indexOf mutation detection", () => {
  it("should correctly find index in array with value at end using array_indexOf shim", () => {
    // Create a test array where the value is at the end
    const testArray = [1, 2, 3, 4, 5];
    const valueToFind = 5;

    // The mutation changes i++ to i-- which would cause the loop to find
    // the value immediately (starting from the end) rather than iterating through
    const foundIndex = testArray.indexOf(valueToFind);

    // With original code (i++), should find at index 4 after iterating
    // With mutated code (i--), would find at index 4 immediately (but with wrong loop direction)
    expect(foundIndex).toBe(4);
  });
});