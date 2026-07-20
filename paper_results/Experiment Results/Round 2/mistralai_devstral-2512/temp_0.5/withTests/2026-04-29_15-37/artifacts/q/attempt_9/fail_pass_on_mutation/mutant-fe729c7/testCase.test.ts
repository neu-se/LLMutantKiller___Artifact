// Test case to detect the mutation in the array_reduce shim
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
  it("should correctly skip missing indices in sparse array reduce", () => {
    // Create a sparse array with a specific pattern
    const sparseArray = [1];
    sparseArray[5] = 6; // Skip indices 1-4

    // Create a promise that will trigger the array_reduce operation
    return Q(sparseArray).then((arr: any[]) => {
      const indicesProcessed: number[] = [];

      arr.reduce((sum: number, val: any, index: number) => {
        indicesProcessed.push(index);
        return sum + (val || 0);
      }, 0);

      // With original code (index in this):
      // Should only process indices 0 and 5
      // indicesProcessed should be [0, 5]

      // With mutated code (if true):
      // Would process all indices 0-5
      // indicesProcessed would be [0, 1, 2, 3, 4, 5]

      expect(indicesProcessed).toEqual([0, 5]);
      expect(indicesProcessed.length).toBe(2);
    });
  });
});