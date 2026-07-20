// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
  it("should correctly handle reduce with initial value on sparse arrays", () => {
    // This test targets the array_reduce shim which is affected by the mutation
    // The mutation changes the condition from `if (arguments.length === 1)` to `if (true)`
    // This would cause the reduce function to always seek the first value in the array
    // even when an initial value is provided, which is incorrect behavior

    // Create a sparse array where the first element is at index 2
    const sparseArray: any[] = [, , 10, 20, 30];

    // Use Q to test the reduce behavior through promise resolution
    return Q(sparseArray).then(function(arr: any[]) {
      // This should use the provided initial value (5) and not seek into the array
      const result = arr.reduce(function(sum: number, val: number, index: number) {
        return sum + (val || 0);
      }, 5);

      // With the original code: 5 (initial) + 0 + 0 + 10 + 20 + 30 = 65
      // With the mutated code: it would seek to index 2 (value 10) and use that as initial,
      // then add the rest: 10 + 20 + 30 = 60 (wrong behavior)
      expect(result).toBe(65);
    });
  });
});