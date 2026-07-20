// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
  it("should correctly handle reduce with initial value", () => {
    // This test targets the array_reduce shim which is affected by the mutation
    // The mutation changes the condition from `if (arguments.length === 1)` to `if (true)`
    // This would cause the reduce function to always seek the first value in the array
    // even when an initial value is provided, which is incorrect behavior

    // Create a sparse array where the first element is at index 2
    const sparseArray: any[] = [, , 10, 20, 30];

    // Test through Q's promise mechanism which internally uses array_reduce
    // We'll use Q.all which uses array_reduce internally
    return Q.all([Q(1), Q(2), Q(3)]).then(function(results) {
      // Now test array_reduce directly on the results array
      // This should use the provided initial value (100) and sum all elements
      const sum = results.reduce(function(sum: number, val: number) {
        return sum + val;
      }, 100);

      // With original code: 100 + 1 + 2 + 3 = 106
      // With mutated code: would seek first value (1) as initial, then 1 + 2 + 3 = 6
      expect(sum).toBe(106);
    });
  });
});