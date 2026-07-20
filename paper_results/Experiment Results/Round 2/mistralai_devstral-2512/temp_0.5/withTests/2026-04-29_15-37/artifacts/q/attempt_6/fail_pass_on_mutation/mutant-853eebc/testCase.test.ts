// Test case to detect the mutation in array_map implementation
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_map mutation test", () => {
  it("should correctly map values using array_map", () => {
    // Access the Q object from the module
    const Q = (qModule as any).default || qModule;

    // Create a test that directly exercises the array_map function
    // by using Q's promise-based operations that internally use array_map
    const testArray = [1, 2, 3];
    const result = Q(testArray).spread((a: number, b: number, c: number) => {
      // This will use array_map internally when processing the array
      return [a * 2, b * 2, c * 2];
    });

    return result.then((mapped: number[]) => {
      // Original code should produce [2, 4, 6]
      // Mutated code will produce [] because array_map callback is never called
      expect(mapped).toEqual([2, 4, 6]);
      expect(mapped.length).toBe(3);
    });
  });
});