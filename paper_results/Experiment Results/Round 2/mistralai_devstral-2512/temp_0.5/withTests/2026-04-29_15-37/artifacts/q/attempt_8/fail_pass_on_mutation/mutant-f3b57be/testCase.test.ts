// Test case to detect the mutation in the array_reduce shim
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation test", () => {
    it("should correctly handle reduce without initial value on non-empty array", () => {
        // This test targets the mutation in the array_reduce shim
        // The mutation changes `if (arguments.length === 1)` to `if (false)`
        // which affects the logic for finding the first value in sparse arrays

        // Create a sparse array where first element is a hole
        const sparseArray = [, 2, 3]; // Hole at index 0

        // Test reduce without initial value
        // This should find the first actual value (2) and use it as initial
        return Q.fcall(() => {
            return sparseArray.reduce((acc: number, val: number) => {
                return acc + val;
            });
        }).then((result: number) => {
            // With original code: finds first value (2) and reduces: 2 + 3 = 5
            // With mutation: the condition is always false, so it skips the logic
            // to find first value and would throw TypeError
            expect(result).toBe(5);
        });
    });
});