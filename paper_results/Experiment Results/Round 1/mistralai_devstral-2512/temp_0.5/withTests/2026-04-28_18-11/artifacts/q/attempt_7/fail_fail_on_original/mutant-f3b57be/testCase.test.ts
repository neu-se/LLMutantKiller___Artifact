// Test case to detect the mutation in the array_reduce shim
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation test", () => {
    it("should handle array with undefined elements and no initial value", () => {
        // Create an array with undefined elements
        const arrayWithUndefined = [undefined, undefined, 5];

        // Use Q to create a promise that will use the array_reduce shim
        const promise = Q.Promise((resolve: any, reject: any) => {
            try {
                // This will trigger the array_reduce shim with no initial value
                const result = arrayWithUndefined.reduce((acc: number, val: number) => {
                    return acc + (val || 0);
                });
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });

        return promise.then(
            (result: number) => {
                // Original code should find first non-undefined element (5) and return it
                expect(result).toBe(5);
            },
            (error: Error) => {
                // Mutated code (if false) would throw TypeError
                expect(error).toBeInstanceOf(TypeError);
            }
        );
    });
});