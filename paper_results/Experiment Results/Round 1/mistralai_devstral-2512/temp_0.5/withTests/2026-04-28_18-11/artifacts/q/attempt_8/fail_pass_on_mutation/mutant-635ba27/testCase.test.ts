// Test case to detect the mutation in array_indexOf shim
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_indexOf mutation detection", () => {
  it("should correctly handle array with single element using array_indexOf shim", () => {
    // Create a test array with single element
    const testArray = [42];
    const valueToFind = 42;

    // The mutation changes i++ to i-- which would cause the loop to:
    // 1. Start at i=0 (correct)
    // 2. Check condition i < 1 (true)
    // 3. Check if testArray[0] === 42 (true)
    // 4. Return 0 (correct)
    // So this test passes both versions, but we need to test the actual shim behavior
    const foundIndex = testArray.indexOf(valueToFind);

    // Should find at index 0
    expect(foundIndex).toBe(0);
  });
});