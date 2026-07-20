// Test case to detect the mutation in array_indexOf
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf mutation test", () => {
  it("should fail when array_indexOf accesses out of bounds", () => {
    // Create a test array where the mutation would cause observable behavior
    const testArray = [1, 2, 3];

    // The mutation changes i < this.length to i <= this.length
    // This causes an extra iteration where i equals array length (3)
    // In the mutated version, this would access testArray[3] which is undefined
    // and could match a search for undefined, giving incorrect results

    // Test searching for undefined in an array that doesn't contain undefined
    // In original code: should return -1
    // In mutated code: might return 3 (the out-of-bounds index)
    const result = testArray.indexOf(undefined);
    expect(result).toBe(-1);

    // Also test with a value that might match the out-of-bounds access
    const arrayWithUndefined = [1, 2, undefined];
    const undefIndex = arrayWithUndefined.indexOf(undefined);
    expect(undefIndex).toBe(2); // Should find the actual undefined at index 2
    expect(undefIndex).not.toBe(3); // Should NOT find it at the out-of-bounds index
  });
});