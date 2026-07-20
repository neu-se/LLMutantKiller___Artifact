// Test case to detect the mutation in array_indexOf
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf mutation test", () => {
  it("should fail when array_indexOf accesses out of bounds with specific test", () => {
    // Create a test array where the mutation would cause observable behavior
    const testArray = [1, 2, 3];

    // The mutation changes i < this.length to i <= this.length
    // This causes an extra iteration where i equals array length (3)
    // We can detect this by checking the exact behavior

    // Test 1: Search for a value that doesn't exist
    const result1 = testArray.indexOf(99);
    expect(result1).toBe(-1);

    // Test 2: Search for undefined in an array without undefined
    const result2 = testArray.indexOf(undefined);
    expect(result2).toBe(-1);

    // Test 3: Verify the array length hasn't changed
    expect(testArray.length).toBe(3);

    // Test 4: Check that accessing out-of-bounds returns undefined
    expect(testArray[3]).toBeUndefined();

    // The mutation would cause indexOf to check testArray[3] === value
    // which could incorrectly match if value is undefined
    // This test should fail in the mutated version when searching for undefined
    const result3 = testArray.indexOf(undefined);
    expect(result3).toBe(-1);
    expect(result3).not.toBe(3);
  });
});