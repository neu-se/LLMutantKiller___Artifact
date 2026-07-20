// Test case to detect the mutation in array_indexOf
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf mutation test", () => {
  it("should correctly find the index of a value in an array", () => {
    // Create a test array with known values
    const testArray = [1, 2, 3, 4, 5];

    // Use Q to wrap the array and test the indexOf behavior
    return Q(testArray).then((arr) => {
      // Test finding an existing value
      const index = arr.indexOf(3);
      expect(index).toBe(2);

      // Test finding the last element
      const lastIndex = arr.indexOf(5);
      expect(lastIndex).toBe(4);

      // Test finding a non-existent value
      const notFoundIndex = arr.indexOf(99);
      expect(notFoundIndex).toBe(-1);

      // The mutation would cause an out-of-bounds access when searching for the last element
      // This should not throw an error in the original code but would in the mutated version
      expect(() => arr.indexOf(5)).not.toThrow();
    });
  });
});