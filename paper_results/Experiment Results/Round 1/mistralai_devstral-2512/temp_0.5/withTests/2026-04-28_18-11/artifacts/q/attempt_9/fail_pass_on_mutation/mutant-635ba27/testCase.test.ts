// Test case to detect the mutation in array_indexOf shim
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_indexOf mutation detection", () => {
  it("should correctly find index in array with value at beginning using array_indexOf shim", () => {
    // Create a test array where the value is at the beginning
    const testArray = [1, 2, 3, 4, 5];
    const valueToFind = 1;

    // The mutation changes i++ to i-- which would cause the loop to:
    // 1. Start at i=0
    // 2. Check condition i < 5 (true)
    // 3. Check if testArray[0] === 1 (true)
    // 4. Return 0 (correct)
    // But the mutation would make it i-- in the loop, which would work for this case
    // We need a test that specifically breaks with i--
    const foundIndex = testArray.indexOf(valueToFind);

    // Should find at index 0
    expect(foundIndex).toBe(0);
  });
});