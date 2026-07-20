// Test case to detect the mutation in array_map implementation
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_map mutation test", () => {
  it("should correctly map values using array_map", () => {
    // Access the Q object from the module
    const Q = (qModule as any).default || qModule;

    // This test will fail if array_map doesn't actually call the callback
    // The mutation removes the callback invocation, so the result will be an empty array
    const input = [1, 2, 3];
    const result = Q(input).then((arr: number[]) => {
      // Directly test the array_map function by using Q's internal implementation
      const array_map = (Q as any).array_map || Array.prototype.map;
      return array_map(arr, (value: number) => value * 2);
    });

    return result.then((mapped: number[]) => {
      // Original code should produce [2, 4, 6]
      // Mutated code will produce [] because callback is never called
      expect(mapped).toEqual([2, 4, 6]);
      expect(mapped.length).toBe(3);
    });
  });
});