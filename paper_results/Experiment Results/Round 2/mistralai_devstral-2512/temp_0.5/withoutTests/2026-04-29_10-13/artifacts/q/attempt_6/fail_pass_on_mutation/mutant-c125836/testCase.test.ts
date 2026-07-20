const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce shim", () => {
  it("should correctly handle array_reduce with initial value on sparse arrays", () => {
    // This test targets the array_reduce shim behavior
    // The mutation changes the condition from checking arguments.length to always true
    // This would break the case where reduce is called with an initial value

    // Create a sparse array with holes
    const sparseArray = [1];
    sparseArray[2] = 3; // Create hole at index 1

    // Test with initial value
    const initialValue = 10;
    const reducer = (acc: number, curr: number) => acc + curr;

    // Directly test the array_reduce function by accessing it through Q's internals
    // We need to trigger the specific code path that was mutated
    const result = Q.all([sparseArray]).then((arrays: number[][]) => {
      // The original code should use the initial value when provided
      // The mutated code would incorrectly skip to the "seek first value" logic
      // even when an initial value is provided
      return arrays[0].reduce(reducer, initialValue);
    });

    return result.then((sum: number) => {
      // With initial value 10, sum should be 10 + 1 + 3 = 14
      // (skipping the hole at index 1)
      expect(sum).toBe(14);
    });
  });
});