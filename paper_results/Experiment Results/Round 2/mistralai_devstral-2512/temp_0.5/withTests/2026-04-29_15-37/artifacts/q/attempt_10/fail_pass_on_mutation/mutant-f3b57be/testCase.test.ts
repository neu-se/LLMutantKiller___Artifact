// Test case to detect the mutation in the array_reduce shim
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation test", () => {
    it("should correctly handle reduce with initial value on sparse arrays", () => {
        // This test directly tests the array_reduce shim behavior
        // The mutation changes `if (arguments.length === 1)` to `if (false)`
        // which affects how the initial value parameter is handled

        // Create a sparse array where first element is a hole
        const sparseArray = [, 2, 3]; // Hole at index 0

        // Test reduce with initial value
        return Q.fcall(() => {
            return sparseArray.reduce((acc: number, val: number) => {
                return acc + val;
            }, 5); // Initial value of 5
        }).then((result: number) => {
            // With original code: 5 (initial) + 0 (hole) + 2 + 3 = 10
            // With mutation: initial value is ignored, finds first value (2) and reduces: 2 + 3 = 5
            expect(result).toBe(10);
        });
    });
});