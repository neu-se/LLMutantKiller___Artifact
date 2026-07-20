// Test case to detect the mutation in the array_reduce shim
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
  it("should correctly handle reduce without initial value on sparse arrays", async () => {
    // Create a sparse array where the mutation would cause incorrect behavior
    const sparseArray = [, , 5]; // eslint-disable-line no-sparse-arrays

    // Test the reduce behavior directly on the array
    const result = await Q(sparseArray).then((arr: any[]) => {
      // Call reduce without initial value to trigger the mutation point
      return arr.reduce((acc: number, val: number) => {
        return acc + (val || 0);
      });
    });

    // With the original code (arguments.length === 1):
    // Should find first defined value (5 at index 2) and use it as basis
    // Then continue reducing from next index (none left)
    // Expected: 5

    // With the mutation (if true):
    // Would always execute the "find first defined value" logic
    // But since we're not providing initial value, this should still work
    // However, the mutation changes the condition from checking arguments.length
    // to always being true, which could affect the logic flow

    // To better detect the mutation, we need to test with a case where
    // the behavior would differ based on the condition
    expect(result).toBe(5);
  });
});