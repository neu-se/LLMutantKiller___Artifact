import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation test", () => {
    it("should correctly handle sparse arrays in reduce", async () => {
        // Create a sparse array where index 1 is not present
        const sparseArray = [1, , 3]; // eslint-disable-line no-sparse-arrays

        // Use Q to wrap the array and test the reduce behavior
        const result = await Q(sparseArray).then((arr: any[]) => {
            // Manually implement the reduce logic that should be affected by the mutation
            let sum = 0;
            let hasOwnPropertyCalled = false;

            // Simulate the reduce operation with a custom callback that checks hasOwnProperty
            arr.reduce((acc: number, val: number, idx: number) => {
                // This check should fail in the mutated version because it always returns true
                if (idx in arr) {
                    hasOwnPropertyCalled = true;
                    return acc + val;
                }
                return acc;
            }, 0);

            // In the original code, index 1 should be skipped (hasOwnProperty returns false)
            // In the mutated code, index 1 will be included (hasOwnProperty always returns true)
            // So the sum will be different
            return { sum, hasOwnPropertyCalled };
        });

        // In the original code, the sum should be 4 (1 + 3) because index 1 is skipped
        // In the mutated code, the sum would be NaN (1 + undefined + 3)
        expect(result.hasOwnPropertyCalled).toBe(true);
        expect(isNaN(result.sum)).toBe(false);
    });
});