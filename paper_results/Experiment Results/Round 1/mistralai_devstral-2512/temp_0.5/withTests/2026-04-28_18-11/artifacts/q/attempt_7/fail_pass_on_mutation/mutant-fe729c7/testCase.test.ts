const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
    it("should correctly handle sparse arrays in reduce", () => {
        // Create a sparse array where index 1 is not present
        const sparseArray = [1, , 3]; // eslint-disable-line no-sparse-arrays

        // Create a promise that will use array_reduce through Q.all
        // Q.all internally uses array_reduce to process the array
        const promises = sparseArray.map((val, idx) => {
            // Only create promises for indices that exist in the array
            if (idx in sparseArray) {
                return Q(val);
            }
            return Q(undefined);
        });

        return Q.all(promises).then((result: any[]) => {
            // In the original code, result should be [1, undefined, 3]
            // because index 1 is skipped in the reduce operation
            expect(result).toEqual([1, undefined, 3]);

            // Now test that the reduce operation works correctly
            const sum = result.reduce((acc, val) => acc + (val || 0), 0);
            expect(sum).toBe(4);
        });
    });
});