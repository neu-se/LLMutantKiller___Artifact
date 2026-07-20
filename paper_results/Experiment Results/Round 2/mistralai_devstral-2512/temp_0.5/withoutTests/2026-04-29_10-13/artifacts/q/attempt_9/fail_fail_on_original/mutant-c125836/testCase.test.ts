const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

// Access the internal array_reduce function
const array_reduce = Q().array_reduce;

describe("Q library array_reduce shim", () => {
  it("should correctly handle reduce with initial value", () => {
    // Create a test array
    const testArray = [1, 2, 3];
    const initialValue = 10;
    const reducer = (acc: number, curr: number) => acc + curr;

    // Test the array_reduce function directly
    // The original code checks arguments.length === 1 to determine if initial value is provided
    // The mutated code always returns true, which would break this case
    const result = array_reduce(testArray, reducer, initialValue);

    // With initial value 10, sum should be 10 + 1 + 2 + 3 = 16
    expect(result).toBe(16);
  });
});