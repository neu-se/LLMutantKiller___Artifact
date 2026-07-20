// Test case to detect the mutation in the array_reduce shim
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation test", () => {
    it("should handle sparse arrays with initial value in reduce operation", () => {
        // Create a sparse array where first element is missing
        const sparseArray = [, 2, 3]; // index 0 is missing

        // Use Q to create a promise that will use the array_reduce shim
        const promise = Q.Promise((resolve: any) => {
            // This will trigger the array_reduce shim when processing the sparse array
            const sum = sparseArray.reduce((acc: number, val: number) => {
                return acc + val;
            }, 0);
            resolve(sum);
        });

        return promise.then((result: number) => {
            // Original code should skip missing index 0 and sum 2 + 3 = 5
            // Mutated code (if false) would throw TypeError
            expect(result).toBe(5);
        });
    });
});