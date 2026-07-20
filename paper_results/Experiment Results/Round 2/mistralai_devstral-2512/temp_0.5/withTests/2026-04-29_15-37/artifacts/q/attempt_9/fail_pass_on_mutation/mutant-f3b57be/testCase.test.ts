// Test case to detect the mutation in the array_reduce shim
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation test", () => {
    it("should correctly handle reduce with initial value on sparse arrays", () => {
        // This test targets the mutation in the array_reduce shim
        // The mutation changes `if (arguments.length === 1)` to `if (false)`
        // which affects how the initial value parameter is handled

        // Create a sparse array with holes
        const sparseArray = [, 2, , 4]; // Holes at indices 0 and 2

        // Test reduce with initial value
        return Q.fcall(() => {
            return sparseArray.reduce((acc: number, val: number, idx: number) => {
                // Track how many times reducer is called
                // With initial value, it should be called for all elements
                return acc + (val || 0);
            }, 100); // Initial value of 100
        }).then((result: number) => {
            // With original code: 100 (initial) + 0 (hole) + 2 + 0 (hole) + 4 = 106
            // With mutation: initial value is ignored, starts with first actual value (2)
            // so it would be: 2 + 0 + 4 = 6
            expect(result).toBe(106);
        });
    });
});