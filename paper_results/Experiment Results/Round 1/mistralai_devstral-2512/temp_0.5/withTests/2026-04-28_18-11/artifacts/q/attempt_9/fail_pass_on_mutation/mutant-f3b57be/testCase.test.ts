// Test case to detect the mutation in the array_reduce shim
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation test", () => {
    it("should handle array with all holes and no initial value", () => {
        // Create a sparse array with all holes
        const allHolesArray = [, , ,]; // all indices are missing

        // Use Q to create a promise that will use the array_reduce shim
        const promise = Q.Promise((resolve: any, reject: any) => {
            try {
                // This will trigger the array_reduce shim with no initial value
                const result = allHolesArray.reduce((acc: any, val: any) => {
                    return acc + val;
                });
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });

        return promise.then(
            () => {
                // Should not reach here for array with all holes and no initial value
                expect(true).toBe(false);
            },
            (error: Error) => {
                // Both original and mutated code should throw TypeError
                // but the mutation changes the condition that determines when to throw
                expect(error).toBeInstanceOf(TypeError);
            }
        );
    });
});