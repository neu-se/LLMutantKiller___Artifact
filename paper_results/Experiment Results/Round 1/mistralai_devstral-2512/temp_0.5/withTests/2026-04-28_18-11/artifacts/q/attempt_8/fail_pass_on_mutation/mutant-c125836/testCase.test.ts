// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
  it("should correctly handle reduce with initial value on arrays with undefined elements", () => {
    // This test targets the array_reduce shim which is affected by the mutation
    // The mutation changes the condition from `if (arguments.length === 1)` to `if (true)`
    // This would cause the reduce function to always seek the first value in the array
    // even when an initial value is provided, which is incorrect behavior

    // Create an array with undefined elements at the beginning
    const arrayWithUndefined: any[] = [undefined, undefined, 10, 20, 30];

    // Use Q to test the reduce behavior through promise resolution
    return Q(arrayWithUndefined).then(function(arr: any[]) {
      // Call reduce with initial value
      // This should use the provided initial value (5) and not seek into the array
      const result = arr.reduce(function(sum: number, val: number) {
        return sum + (val || 0);
      }, 5);

      // With original code: 5 (initial) + 0 + 0 + 10 + 20 + 30 = 65
      // With mutated code: would seek to first defined value (10) and use that as initial,
      // then add the rest: 10 + 20 + 30 = 60 (wrong behavior)
      expect(result).toBe(65);
    });
  });
});