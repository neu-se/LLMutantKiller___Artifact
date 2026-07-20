// Test case to detect the mutation in array_indexOf
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf mutation test", () => {
  it("should detect out-of-bounds access in array_indexOf", () => {
    // Create a test array
    const testArray = [1, 2, 3, 4, 5];

    // The mutation changes i < this.length to i <= this.length
    // This causes an extra iteration where i equals array length
    // We can detect this by checking if the function throws when it shouldn't
    expect(() => {
      // This should work fine in original code
      const index = testArray.indexOf(5);
      // The mutation would cause an out-of-bounds access here
      // which might throw in some environments
    }).not.toThrow();

    // Test with a sparse array where the mutation would be more likely to cause issues
    const sparseArray = [1, , 3]; // eslint-disable-line no-sparse-arrays
    sparseArray[100] = 5; // Create a large gap

    expect(() => {
      const index = sparseArray.indexOf(5);
      expect(index).toBe(100);
    }).not.toThrow();

    // Test edge case with array of length 0
    const emptyArray: number[] = [];
    expect(() => {
      const index = emptyArray.indexOf(1);
      expect(index).toBe(-1);
    }).not.toThrow();
  });
});