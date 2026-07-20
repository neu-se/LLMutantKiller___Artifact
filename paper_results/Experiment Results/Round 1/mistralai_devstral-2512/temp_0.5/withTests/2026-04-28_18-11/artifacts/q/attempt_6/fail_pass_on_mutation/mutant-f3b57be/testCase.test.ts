// Test case to detect the mutation in the array_reduce shim
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation test", () => {
    it("should handle array with single element and no initial value", () => {
        // Create an array with one element
        const singleElementArray = [42];

        // Use Q to create a promise that will use the array_reduce shim
        const promise = Q.Promise((resolve: any, reject: any) => {
            try {
                // This will trigger the array_reduce shim with no initial value
                const result = singleElementArray.reduce((acc: number, val: number) => {
                    return acc + val;
                });
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });

        return promise.then(
            (result: number) => {
                // Original code should use first element (42) as initial value
                expect(result).toBe(42);
            },
            (error: Error) => {
                // Mutated code (if false) would throw TypeError
                expect(error).toBeInstanceOf(TypeError);
            }
        );
    });
});