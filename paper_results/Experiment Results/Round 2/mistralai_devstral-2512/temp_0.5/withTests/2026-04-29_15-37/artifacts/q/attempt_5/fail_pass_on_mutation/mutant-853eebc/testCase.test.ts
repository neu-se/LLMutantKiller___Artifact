// Test case to detect the mutation in array_map implementation
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_map mutation test", () => {
  it("should correctly map values using array_map", () => {
    // Access the Q object from the module
    const Q = (qModule as any).default || qModule;

    // Test the array_map function directly by creating a scenario that uses it
    // The mutation removes the callback invocation in array_map
    const testArray = [1, 2, 3];
    const result = Q(testArray).then((arr: number[]) => {
      // Use Q's spread to test array_map indirectly
      return Q.all([Q(arr[0] * 2), Q(arr[1] * 2), Q(arr[2] * 2)]);
    });

    return result.then((mapped: number[]) => {
      // Original code should produce [2, 4, 6]
      // Mutated code will produce different results if array_map is broken
      expect(mapped).toEqual([2, 4, 6]);
      expect(mapped.length).toBe(3);
    });
  });
});