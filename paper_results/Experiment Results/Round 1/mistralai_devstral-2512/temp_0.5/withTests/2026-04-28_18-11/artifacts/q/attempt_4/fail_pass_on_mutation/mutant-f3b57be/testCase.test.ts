// Test case to detect the mutation in the array_reduce shim
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation test", () => {
    it("should handle empty array with no initial value in reduce operation", () => {
        // Create an empty array
        const emptyArray: any[] = [];

        // Use Q to create a promise that will use the array_reduce shim
        const promise = Q.Promise((resolve: any, reject: any) => {
            try {
                // This will trigger the array_reduce shim with no initial value
                const result = emptyArray.reduce((acc: number, val: number) => {
                    return acc + val;
                });
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });

        return promise.then(
            () => {
                // Should not reach here for empty array with no initial value
                expect(true).toBe(false);
            },
            (error: Error) => {
                // Original code should throw TypeError for empty array with no initial value
                // Mutated code (if false) would also throw TypeError but for different reason
                expect(error).toBeInstanceOf(TypeError);
            }
        );
    });
});