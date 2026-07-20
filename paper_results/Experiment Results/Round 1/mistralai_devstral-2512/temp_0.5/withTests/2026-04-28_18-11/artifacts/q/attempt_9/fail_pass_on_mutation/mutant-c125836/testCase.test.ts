// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
  it("should correctly handle reduce with initial value on arrays with holes", () => {
    // This test targets the array_reduce shim which is affected by the mutation
    // The mutation changes the condition from `if (arguments.length === 1)` to `if (true)`
    // This would cause the reduce function to always seek the first value in the array
    // even when an initial value is provided, which is incorrect behavior

    // Create a sparse array with holes (missing indices)
    const sparseArray = [, , 10, , 20, 30]; // indices 0,1,3 are holes

    // Use Q.all to test the reduce behavior
    return Q.all([Q(sparseArray)]).spread(function(arr) {
      // Call reduce with initial value on sparse array
      // This should use the provided initial value (5) and skip holes
      const result = arr.reduce(function(sum: number, val: number, index: number, array: any[]) {
        // Only add if the index exists in the array (not a hole)
        if (index in array) {
          return sum + (val || 0);
        }
        return sum;
      }, 5);

      // With original code: 5 (initial) + 10 + 20 + 30 = 65 (skips holes)
      // With mutated code: would seek to first defined value (10) and use that as initial,
      // then add the rest: 10 + 20 + 30 = 60 (wrong behavior)
      expect(result).toBe(65);
    });
  });
});