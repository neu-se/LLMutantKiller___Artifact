// Test case to detect the mutation in the array_reduce shim
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
  it("should correctly handle reduce with initial value on arrays with only undefined values", async () => {
    // Create an array with only undefined values
    const arrayWithUndefineds = [undefined, undefined, undefined];
    const initialValue = 100;

    // Test the reduce behavior directly on the array
    const result = await Q(arrayWithUndefineds).then((arr: any[]) => {
      return arr.reduce((acc: number, val: number) => {
        return acc + (val || 0);
      }, initialValue);
    });

    // With the original code (arguments.length === 1):
    // When initialValue is provided, it should use it and process all elements
    // Expected: 100 + 0 + 0 + 0 = 100

    // With the mutation (if true):
    // Would always try to find first defined value even when initialValue is provided
    // For array with only undefineds, this would throw TypeError
    // Expected: TypeError

    expect(result).toBe(100);
  });
});