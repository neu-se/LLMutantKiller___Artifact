// Test case to detect the mutation in the array_reduce shim
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation test", () => {
  it("should correctly handle reduce with initial value on sparse arrays", async () => {
    // Create a sparse array where the mutation would cause incorrect behavior
    const sparseArray = [1, , 3]; // eslint-disable-line no-sparse-arrays
    const initialValue = 10;

    // Use Q to wrap the array and test the reduce behavior
    const result = await Q(sparseArray).then((arr: any[]) => {
      return arr.reduce((acc: number, val: number) => {
        return acc + (val || 0);
      }, initialValue);
    });

    // With the original code (arguments.length === 1), it should:
    // 1. Find the first defined value (1 at index 0)
    // 2. Start reducing from there with that value as basis
    // 3. Skip undefined values
    // Expected: 1 (from index 0) + 0 (skipped index 1) + 3 (index 2) = 4
    // But since we provided initialValue, it should use that and sum all defined values
    // Expected: 10 + 1 + 0 + 3 = 14

    // With the mutation (if true), it would:
    // Always try to find first defined value even when initialValue is provided
    // This would incorrectly use the first defined array value instead of initialValue
    // Expected: 1 + 0 + 3 = 4 (wrong)

    expect(result).toBe(14);
  });
});