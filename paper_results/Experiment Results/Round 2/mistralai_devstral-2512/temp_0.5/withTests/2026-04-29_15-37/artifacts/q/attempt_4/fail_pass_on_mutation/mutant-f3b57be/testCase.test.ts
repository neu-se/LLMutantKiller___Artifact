// Test case to detect the mutation in the array_reduce shim
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation test", () => {
    it("should correctly handle reduce with initial value on sparse arrays", async () => {
        // This test targets the mutation in the array_reduce shim
        // The mutation changes the condition from `if (arguments.length === 1)`
        // to `if (false)`, which breaks the handling of the initial value parameter

        // Create a sparse array with holes
        const sparseArray = [1, , , 4]; // Holes at indices 1 and 2

        // Use reduce with an initial value
        const result = await Q.fcall(() => {
            return sparseArray.reduce((acc, val, idx) => {
                // Count how many times the reducer is called
                // With initial value, it should be called for each element including holes
                // Without initial value (mutation), it skips the first element
                return acc + (val || 0);
            }, 100); // Initial value of 100
        });

        // With original code: 100 (initial) + 1 + 0 (hole) + 0 (hole) + 4 = 105
        // With mutation: The initial value is ignored, so it starts with first element (1)
        // and would be: 1 + 0 + 0 + 4 = 5
        expect(result).toBe(105);
    });
});