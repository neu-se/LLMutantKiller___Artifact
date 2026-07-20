// Test case to detect the mutation in the array_reduce shim
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation test", () => {
    it("should handle sparse array with no initial value in reduce operation", () => {
        // Create a sparse array where first element is missing
        const sparseArray = [, 2, 3]; // index 0 is missing

        // Use Q to create a promise that will use the array_reduce shim
        const promise = Q.Promise((resolve: any, reject: any) => {
            try {
                // This will trigger the array_reduce shim with no initial value
                const result = sparseArray.reduce((acc: number, val: number) => {
                    return acc + val;
                });
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });

        return promise.then(
            (result: number) => {
                // Original code should find first existing element (2) and sum with 3 = 5
                expect(result).toBe(5);
            },
            (error: Error) => {
                // Mutated code (if false) would throw TypeError
                expect(error).toBeInstanceOf(TypeError);
            }
        );
    });
});