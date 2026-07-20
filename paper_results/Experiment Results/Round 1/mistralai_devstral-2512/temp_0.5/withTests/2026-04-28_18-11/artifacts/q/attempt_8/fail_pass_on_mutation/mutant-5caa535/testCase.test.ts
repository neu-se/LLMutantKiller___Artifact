// Test case to detect the mutation in array_indexOf
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf mutation test", () => {
  it("should detect incorrect indexOf behavior with sparse arrays", () => {
    // Create a sparse array where the mutation would cause observable behavior
    const sparseArray = [1, , 3]; // eslint-disable-line no-sparse-arrays

    // The mutation changes i < this.length to i <= this.length
    // This causes an extra iteration where i equals array length
    // In sparse arrays, this might incorrectly find undefined at the out-of-bounds index

    // Test searching for undefined
    // In original code: should return -1 (not found)
    // In mutated code: might return 3 (found at out-of-bounds index)
    const result = sparseArray.indexOf(undefined);
    expect(result).toBe(-1);
    expect(result).not.toBe(3);

    // Test with an array that has explicit undefined values
    const arrayWithUndefined = [1, undefined, 3];
    const undefIndex = arrayWithUndefined.indexOf(undefined);
    expect(undefIndex).toBe(1); // Should find the actual undefined at index 1
    expect(undefIndex).not.toBe(3); // Should NOT find it at the out-of-bounds index
  });
});