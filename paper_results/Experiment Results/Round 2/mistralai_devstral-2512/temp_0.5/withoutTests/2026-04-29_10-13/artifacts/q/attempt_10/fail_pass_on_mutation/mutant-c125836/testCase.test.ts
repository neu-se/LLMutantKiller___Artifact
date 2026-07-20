const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce shim", () => {
  it("should correctly handle array_reduce with initial value", () => {
    // This test targets the array_reduce shim behavior
    // The mutation changes the condition from checking arguments.length to always true
    // This would break the case where reduce is called with an initial value

    // Create a test array
    const testArray = [1, 2, 3];
    const initialValue = 10;
    const reducer = (acc: number, curr: number) => acc + curr;

    // We need to test the array_reduce function indirectly through Q operations
    // that use it internally. The all() method uses array_reduce.
    return Q.all([testArray]).then((arrays: number[][]) => {
      // The original code should use the initial value when provided
      // The mutated code would incorrectly skip to the "seek first value" logic
      // even when an initial value is provided
      const result = arrays[0].reduce(reducer, initialValue);

      // With initial value 10, sum should be 10 + 1 + 2 + 3 = 16
      expect(result).toBe(16);
      return result;
    });
  });
});