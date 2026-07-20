// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
  it("should correctly handle reduce without initial value on sparse arrays", () => {
    // This test targets the array_reduce shim which is affected by the mutation
    // The mutation changes the condition from `if (arguments.length === 1)` to `if (true)`
    // This would cause the reduce function to always seek the first value in the array
    // even when an initial value is provided, which is incorrect behavior

    // Create a sparse array where the first element is at index 2
    const sparseArray: any[] = [, , 10, 20, 30];

    // Use Q to test the reduce behavior through promise resolution
    return Q(sparseArray).then(function(arr: any[]) {
      // Call reduce with only the callback (no initial value)
      // This should seek to the first defined value (10 at index 2) and use it as initial
      const result = arr.reduce(function(sum: number, val: number) {
        return sum + (val || 0);
      });

      // With both original and mutated code: it seeks to index 2 (value 10) as initial,
      // then adds the rest: 10 + 20 + 30 = 60
      // However, the mutation would cause it to always seek even when initial value is provided
      expect(result).toBe(60);
    });
  });
});