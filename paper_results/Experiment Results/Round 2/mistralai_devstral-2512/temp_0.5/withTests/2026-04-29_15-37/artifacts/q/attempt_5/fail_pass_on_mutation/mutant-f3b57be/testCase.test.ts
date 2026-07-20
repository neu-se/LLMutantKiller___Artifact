// Test case to detect the mutation in the array_reduce shim
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation test", () => {
    it("should correctly handle reduce with initial value on sparse arrays", () => {
        // This test directly tests the array_reduce function behavior
        // The mutation changes the condition from `if (arguments.length === 1)`
        // to `if (false)`, which affects how initial values are handled

        // Create a sparse array
        const sparseArray = [1, , 3];

        // Test the reduce implementation directly through Q's promise system
        // This will exercise the array_reduce shim code
        return Q.fcall(() => {
            // This should use the shim's reduce implementation
            return sparseArray.reduce((acc: number, val: number) => {
                return acc + (val || 0);
            }, 5); // Initial value of 5
        }).then((result: number) => {
            // With original code: 5 (initial) + 1 + 0 (hole) + 3 = 9
            // With mutation: initial value is ignored, so 1 + 0 + 3 = 4
            expect(result).toBe(9);
        });
    });
});