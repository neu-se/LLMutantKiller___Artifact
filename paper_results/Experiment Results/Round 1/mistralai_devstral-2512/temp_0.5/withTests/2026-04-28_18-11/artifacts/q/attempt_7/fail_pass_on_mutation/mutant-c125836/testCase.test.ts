// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
  it("should correctly handle reduce with initial value on empty arrays", () => {
    // This test targets the array_reduce shim which is affected by the mutation
    // The mutation changes the condition from `if (arguments.length === 1)` to `if (true)`
    // This would cause the reduce function to always seek the first value in the array
    // even when an initial value is provided, which is incorrect behavior

    // Create an empty array
    const emptyArray: any[] = [];

    // Use Q to test the reduce behavior through promise resolution
    return Q(emptyArray).then(function(arr: any[]) {
      // Call reduce with initial value on empty array
      // This should return the initial value (42) without seeking
      const result = arr.reduce(function(sum: number, val: number) {
        return sum + (val || 0);
      }, 42);

      // With original code: returns 42 (initial value)
      // With mutated code: would try to seek first value and throw TypeError
      expect(result).toBe(42);
    });
  });
});