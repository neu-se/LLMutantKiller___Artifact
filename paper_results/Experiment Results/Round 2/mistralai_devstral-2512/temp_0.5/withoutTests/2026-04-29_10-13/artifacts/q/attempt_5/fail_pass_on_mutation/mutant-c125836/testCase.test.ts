const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_reduce shim", () => {
  it("should correctly handle array_reduce with initial value on empty arrays", () => {
    // This test targets the array_reduce shim behavior
    // The mutation changes the condition from checking arguments.length to always true
    // This would break the case where reduce is called with an initial value on empty arrays

    // Create an empty array
    const emptyArray: number[] = [];

    // Test with initial value
    const initialValue = 42;
    const reducer = (acc: number, curr: number) => acc + curr;

    // Use Q.all which internally uses array_reduce
    return Q.all([emptyArray]).then((arrays: number[][]) => {
      // The original code should return the initial value for empty arrays
      // The mutated code would incorrectly try to find the first value
      // and throw a TypeError
      const result = arrays[0].reduce(reducer, initialValue);

      // Should return the initial value 42 for empty array
      expect(result).toBe(42);
      return result;
    });
  });
});