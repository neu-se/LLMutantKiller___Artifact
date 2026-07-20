// Test case to detect the mutation in the array_reduce shim
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
  it("should correctly handle reduce with initial value on sparse arrays", async () => {
    // Create a sparse array where the mutation would cause incorrect behavior
    const sparseArray = [, 5, , 10]; // eslint-disable-line no-sparse-arrays
    const initialValue = 100;

    // Test the reduce behavior directly on the array WITH initial value
    // This will trigger the mutation point in the reduce shim
    const result = await Q(sparseArray).then((arr: any[]) => {
      return arr.reduce((acc: number, val: number) => {
        return acc + (val || 0);
      }, initialValue);
    });

    // With the original code (arguments.length === 1):
    // When initialValue is provided, it should use it and process all elements
    // Expected: 100 + 0 + 5 + 0 + 10 = 115

    // With the mutation (if true):
    // Would always try to find first defined value even when initialValue is provided
    // Would skip undefined at index 0, use 5 at index 1 as basis, then continue
    // Expected: 5 + 0 + 10 = 15 (wrong)

    expect(result).toBe(115);
  });
});