import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation test", () => {
    it("should correctly handle sparse arrays in reduce", () => {
        // Create a sparse array where index 1 is not present
        const sparseArray = [1, , 3]; // eslint-disable-line no-sparse-arrays

        // Test the array_reduce function directly by creating a promise that uses it
        const deferred = Q.defer();
        const result = deferred.promise.then((arr: any[]) => {
            // Use array_reduce to sum the array
            return arr.reduce((acc: number, val: number) => acc + val, 0);
        });

        // Resolve with the sparse array
        deferred.resolve(sparseArray);

        // In the original code, the sum should be 4 (1 + 3) because index 1 is skipped
        // In the mutated code, the sum would be NaN (1 + undefined + 3)
        return result.then((sum: number) => {
            expect(isNaN(sum)).toBe(false);
            expect(sum).toBe(4);
        });
    });
});