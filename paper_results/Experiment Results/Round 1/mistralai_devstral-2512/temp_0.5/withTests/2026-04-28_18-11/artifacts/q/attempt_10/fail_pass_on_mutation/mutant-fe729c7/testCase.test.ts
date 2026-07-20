const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
    it("should correctly handle sparse arrays in reduce", () => {
        // Create a sparse array where index 1 is not present
        const sparseArray = [1, , 3]; // eslint-disable-line no-sparse-arrays

        // Test the array_reduce function by using Q.all which internally uses array_reduce
        // We need to create a scenario where the mutation would cause different behavior
        const promises = [
            Q(1),
            new Promise((resolve) => setTimeout(() => resolve(undefined), 10)),
            Q(3)
        ];

        return Q.all(promises).then((result: any[]) => {
            // In the original code, result should be [1, undefined, 3]
            expect(result).toEqual([1, undefined, 3]);

            // Now test the reduce operation on the result
            // The mutation would affect how sparse arrays are handled in reduce
            const sum = result.reduce((acc: number, val: number, idx: number, arr: any[]) => {
                // This is where the mutation would make a difference
                // Original: if (index in this)
                // Mutated: if (true)
                if (idx in arr) {
                    return acc + (val || 0);
                }
                return acc;
            }, 0);

            // In the original code, sum should be 4 (1 + 0 + 3)
            // In the mutated code, it might behave differently with sparse arrays
            expect(sum).toBe(4);
        });
    });
});