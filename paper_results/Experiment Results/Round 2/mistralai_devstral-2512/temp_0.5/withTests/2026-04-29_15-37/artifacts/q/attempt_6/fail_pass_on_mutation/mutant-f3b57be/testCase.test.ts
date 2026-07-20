// Test case to detect the mutation in the array_reduce shim
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation test", () => {
    it("should correctly handle reduce with initial value on empty arrays", () => {
        // This test targets the mutation in the array_reduce shim
        // The mutation changes the condition from `if (arguments.length === 1)`
        // to `if (false)`, which affects the behavior when no initial value is provided

        // Create an empty array
        const emptyArray: number[] = [];

        // Test reduce without initial value on empty array
        // This should throw in original code but behave differently in mutated code
        return Q.fcall(() => {
            return emptyArray.reduce((acc: number, val: number) => {
                return acc + val;
            });
        }).then(() => {
            // Should not reach here in original code
            throw new Error("Expected to throw but didn't");
        }).catch((error: Error) => {
            // Original code should throw "Reduce of empty array with no initial value"
            // Mutated code will throw a different error
            expect(error.message).toContain("Reduce of empty array with no initial value");
        });
    });
});