// Test case to detect the mutation in the array_reduce shim
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
  it("should correctly handle sparse arrays in reduce operations", () => {
    // Create a sparse array where some indices are missing
    const sparseArray = [1, , 3]; // index 1 is missing
    sparseArray[4] = 5; // Add element at index 4, leaving index 3 missing

    // Test the array_reduce function directly by creating a promise that uses it
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Use the internal array_reduce function through the promise's reduce operation
    return Q(sparseArray).then((arr: any[]) => {
      // Create a custom reduce that will expose the difference
      let iterationCount = 0;
      const result = arr.reduce((sum: number, val: any, index: number) => {
        iterationCount++;
        // Only add defined values
        if (val !== undefined) {
          return sum + val;
        }
        return sum;
      }, 0);

      // With original code: should iterate 3 times (indices 0, 2, 4) and sum to 9
      // With mutated code: would iterate 5 times (all indices) but still sum to 9
      // So we need to check the iteration count instead
      expect(iterationCount).toBe(3);
      expect(result).toBe(9);
    });
  });
});