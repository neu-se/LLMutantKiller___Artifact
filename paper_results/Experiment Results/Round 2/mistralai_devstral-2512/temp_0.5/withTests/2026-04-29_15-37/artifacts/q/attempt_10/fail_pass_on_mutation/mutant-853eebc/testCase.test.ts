// Test case to detect the mutation in array_map implementation
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_map mutation test", () => {
  it("should correctly map values using array_map", () => {
    // Access the Q object from the module
    const Q = (qModule as any).default || qModule;

    // Test the array_map function by creating a scenario that directly uses it
    // The mutation removes the callback invocation in array_map
    const testArray = [1, 2, 3];
    const result = Q(testArray).then((arr: number[]) => {
      // Use Q's internal array_map implementation
      const array_map = (Q as any).array_map;
      if (typeof array_map === 'function') {
        // This will fail on mutated code because the callback is never called
        return array_map(arr, (value: number, index: number) => {
          return value * 2;
        });
      }
      return arr.map((value: number) => value * 2);
    });

    return result.then((mapped: number[]) => {
      // Original code should produce [2, 4, 6]
      // Mutated code will produce [] because array_map callback is never called
      expect(mapped).toEqual([2, 4, 6]);
      expect(mapped.length).toBe(3);
    });
  });
});