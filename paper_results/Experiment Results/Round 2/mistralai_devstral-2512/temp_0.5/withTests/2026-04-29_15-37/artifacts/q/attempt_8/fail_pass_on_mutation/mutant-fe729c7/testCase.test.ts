// Test case to detect the mutation in the array_reduce shim
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
  it("should correctly handle sparse arrays in promise resolution", () => {
    // Create a sparse array where most indices are missing
    const sparseArray = [];
    sparseArray[0] = Q.resolve(1);
    sparseArray[100] = Q.resolve(101);
    // All indices between 1-99 are missing

    // Use Q.all which internally uses array_reduce
    return Q.all(sparseArray).then((results) => {
      // Count how many elements were actually processed
      let processedCount = 0;
      for (const key in results) {
        if (results.hasOwnProperty(key)) {
          processedCount++;
        }
      }

      // With original code (index in this):
      // Should only process indices 0 and 100 (2 elements)
      // processedCount should be 2

      // With mutated code (if true):
      // Would try to process all indices 0-100 (101 elements)
      // This would cause the reduce to iterate through all indices

      expect(processedCount).toBe(2);
      expect(results[0]).toBe(1);
      expect(results[100]).toBe(101);
    });
  });
});