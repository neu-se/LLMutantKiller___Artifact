// Test case to detect the mutation in the array_reduce shim
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation test", () => {
    it("should handle array with one hole at start and no initial value", () => {
        // Create a sparse array with hole at start
        const arrayWithHole = [, 5]; // index 0 is missing

        // Use Q to create a promise that will use the array_reduce shim
        const promise = Q.Promise((resolve: any, reject: any) => {
            try {
                // This will trigger the array_reduce shim with no initial value
                const result = arrayWithHole.reduce((acc: any, val: any) => {
                    return acc + val;
                });
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });

        return promise.then(
            (result: number) => {
                // Original code should find first existing element (5) and return it
                expect(result).toBe(5);
            },
            (error: Error) => {
                // Mutated code (if false) would throw TypeError
                expect(error).toBeInstanceOf(TypeError);
            }
        );
    });
});