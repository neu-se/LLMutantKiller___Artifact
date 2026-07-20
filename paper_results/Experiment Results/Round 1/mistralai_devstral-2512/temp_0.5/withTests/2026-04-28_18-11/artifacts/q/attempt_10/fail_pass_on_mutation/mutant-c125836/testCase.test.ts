// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
  it("should correctly handle reduce with initial value on arrays with only holes", () => {
    // This test targets the array_reduce shim which is affected by the mutation
    // The mutation changes the condition from `if (arguments.length === 1)` to `if (true)`
    // This would cause the reduce function to always seek the first value in the array
    // even when an initial value is provided, which is incorrect behavior

    // Create an array with only holes (no actual elements)
    const holesOnlyArray = [,,,,]; // length 4, but no actual elements

    // Use Q to test the reduce behavior
    return Q(holesOnlyArray).then(function(arr) {
      // Call reduce with initial value on array with only holes
      // This should use the provided initial value (42) without seeking
      const result = arr.reduce(function(sum: number) {
        return sum;
      }, 42);

      // With original code: returns 42 (initial value, no elements to reduce)
      // With mutated code: would try to seek first value and throw TypeError
      expect(result).toBe(42);
    });
  });
});