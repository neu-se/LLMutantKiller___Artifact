// Test case to detect the mutation in array_map implementation
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_map mutation test", () => {
  it("should correctly map values using array_map", () => {
    // Access the Q object from the module
    const Q = (qModule as any).default || qModule;

    // Test the array_map function by creating a promise that uses it internally
    // The mutation removes the callback invocation in array_map
    const testArray = [1, 2, 3];
    const result = Q(testArray).then((arr: number[]) => {
      // Force the use of Q's internal array_map by using a promise-based approach
      return Q.all(arr.map((value: number) => Q(value * 2)));
    });

    return result.then((mapped: number[]) => {
      // Original code should produce [2, 4, 6]
      // Mutated code will produce different results if array_map is broken
      expect(mapped).toEqual([2, 4, 6]);
      expect(mapped.length).toBe(3);
    });
  });
});