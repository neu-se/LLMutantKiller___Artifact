// Test case to detect the mutation in the array_reduce shim
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
  it("should correctly handle reduce with initial value on empty arrays", async () => {
    // Create an empty array to test the reduce behavior
    const emptyArray: any[] = [];
    const initialValue = 42;

    // Test the reduce behavior directly on the array
    const result = await Q(emptyArray).then((arr: any[]) => {
      return arr.reduce((acc: number, val: number) => {
        return acc + val;
      }, initialValue);
    });

    // With the original code (arguments.length === 1):
    // When initialValue is provided, it should use it and return it for empty array
    // Expected: 42

    // With the mutation (if true):
    // Would always try to find first defined value even when initialValue is provided
    // For empty array, this would throw TypeError
    // Expected: TypeError

    expect(result).toBe(42);
  });
});