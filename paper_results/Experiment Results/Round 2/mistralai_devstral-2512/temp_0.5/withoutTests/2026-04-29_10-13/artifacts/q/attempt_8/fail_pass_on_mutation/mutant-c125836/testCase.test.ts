const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce shim", () => {
  it("should correctly handle array_reduce with initial value on sparse arrays", () => {
    // This test targets the array_reduce shim behavior
    // The mutation changes the condition from checking arguments.length to always true
    // This would break the case where reduce is called with an initial value

    // Create a sparse array with holes
    const sparseArray = [1];
    sparseArray[3] = 4; // Create holes at indices 1 and 2

    // Test with initial value
    const initialValue = 10;
    const reducer = (acc: number, curr: number) => acc + curr;

    // Use Q.all which internally uses array_reduce
    return Q.all([sparseArray]).then((arrays: number[][]) => {
      // The original code should use the initial value when provided
      // The mutated code would incorrectly skip to the "seek first value" logic
      // even when an initial value is provided
      const result = arrays[0].reduce(reducer, initialValue);

      // With initial value 10, sum should be 10 + 1 + 4 = 15
      // (skipping the holes at indices 1 and 2)
      expect(result).toBe(15);
      return result;
    });
  });
});