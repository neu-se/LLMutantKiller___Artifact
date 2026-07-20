// Test case to detect the mutation in the array_reduce shim
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation test", () => {
    it("should correctly handle reduce with initial value on sparse arrays", async () => {
        // This test targets the mutation in the array_reduce shim
        // The mutation changes the condition from `if (arguments.length === 1)`
        // to `if (false)`, which breaks the handling of the initial value parameter

        // Create a sparse array
        const sparseArray = [1, , 3]; // Note the hole at index 1

        // Use reduce with an initial value - this should work correctly
        // The reducer should be called with the initial value as the first basis
        const result = await Q.fcall(() => {
            return sparseArray.reduce((acc, val, idx) => {
                return acc + (val || 0);
            }, 10); // Initial value of 10
        });

        // With the original code: 10 (initial) + 1 + 0 (hole) + 3 = 14
        // With the mutation: The initial value is ignored, so it would be 1 + 0 + 3 = 4
        expect(result).toBe(14);
    });
});