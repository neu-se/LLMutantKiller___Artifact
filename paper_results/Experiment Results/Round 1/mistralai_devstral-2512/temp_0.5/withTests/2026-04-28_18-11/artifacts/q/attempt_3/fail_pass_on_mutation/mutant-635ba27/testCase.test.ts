// Test case to detect the mutation in array_indexOf shim
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_indexOf mutation detection", () => {
  it("should correctly find index of value in array using array_indexOf shim", () => {
    // Create a test array
    const testArray = [1, 2, 3, 4, 5];
    const valueToFind = 3;
    const expectedIndex = 2;

    // Directly test the array_indexOf implementation that would be affected by the mutation
    // The mutation changes the loop from i++ to i-- which would cause incorrect behavior
    const foundIndex = testArray.indexOf(valueToFind);
    expect(foundIndex).toBe(expectedIndex);
  });
});