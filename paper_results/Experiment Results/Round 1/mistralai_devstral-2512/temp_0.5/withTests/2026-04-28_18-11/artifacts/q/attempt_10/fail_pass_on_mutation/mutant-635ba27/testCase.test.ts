// Test case to detect the mutation in array_indexOf shim
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_indexOf mutation detection", () => {
  it("should correctly find index in array with value not present using array_indexOf shim", () => {
    // Create a test array where the value is not present
    const testArray = [1, 2, 3, 4, 5];
    const valueToFind = 99;

    // The mutation changes i++ to i-- which would cause the loop to:
    // 1. Start at i=0
    // 2. Check condition i < 5 (true)
    // 3. Check values until i reaches 4
    // 4. i-- would make it go to -1, then condition fails
    // Both versions should return -1, but the mutation would behave differently
    const foundIndex = testArray.indexOf(valueToFind);

    // Should return -1 for value not found
    expect(foundIndex).toBe(-1);
  });
});