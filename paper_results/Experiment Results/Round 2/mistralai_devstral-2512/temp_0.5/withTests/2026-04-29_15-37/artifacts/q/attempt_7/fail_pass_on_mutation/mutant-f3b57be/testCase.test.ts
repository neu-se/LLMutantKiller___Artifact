// Test case to detect the mutation in the array_reduce shim
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation test", () => {
    it("should correctly handle reduce with initial value", () => {
        // This test directly targets the array_reduce shim mutation
        // The mutation changes `if (arguments.length === 1)` to `if (false)`
        // which affects how the initial value parameter is handled

        // Create a test array
        const testArray = [2, 3, 4];

        // Test with explicit initial value
        return Q.fcall(() => {
            return testArray.reduce((acc: number, val: number) => {
                return acc + val;
            }, 10); // Initial value of 10
        }).then((result: number) => {
            // With original code: 10 + 2 + 3 + 4 = 19
            // With mutation: initial value is ignored, so 2 + 3 + 4 = 9
            expect(result).toBe(19);
        });
    });
});