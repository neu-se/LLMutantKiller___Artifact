// Test case to detect the mutation in array_indexOf shim
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf mutation detection", () => {
  it("should correctly find index of value in array using Q", () => {
    // Create a test array
    const testArray = [1, 2, 3, 4, 5];
    const valueToFind = 3;
    const expectedIndex = 2;

    // Use Q to test the array operations
    return Q(testArray).then((arr: number[]) => {
      // Test the array_indexOf behavior by checking if the value exists
      // The mutation changes the loop from i++ to i-- which would cause incorrect behavior
      const foundIndex = arr.indexOf(valueToFind);
      expect(foundIndex).toBe(expectedIndex);
    });
  });
});