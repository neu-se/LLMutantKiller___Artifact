// Test case to detect the mutation in the array_reduce shim
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation test", () => {
    it("should correctly handle reduce without initial value on empty arrays", async () => {
        // This test targets the mutation in the array_reduce shim
        // The mutation changes the condition from `if (arguments.length === 1)`
        // to `if (false)`, which affects the behavior when no initial value is provided

        // Create an empty array
        const emptyArray: number[] = [];

        // Try to use reduce without an initial value on an empty array
        // This should throw a TypeError in the original code
        // With the mutation, the condition is always false, so it will skip the initial value logic
        // and try to find the first value in the array, which will also throw but for different reasons
        let errorThrown = false;
        let errorMessage = "";

        try {
            await Q.fcall(() => {
                return emptyArray.reduce((acc, val) => {
                    return acc + val;
                });
            });
        } catch (error) {
            errorThrown = true;
            errorMessage = error.message;
        }

        // The original code should throw with "Reduce of empty array with no initial value"
        // The mutated code will throw a different error
        expect(errorThrown).toBe(true);
        expect(errorMessage).toContain("Reduce of empty array with no initial value");
    });
});