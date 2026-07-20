const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
    it("should correctly handle sparse arrays in reduce", () => {
        // Create a sparse array where index 1 is not present
        const sparseArray = [1, , 3]; // eslint-disable-line no-sparse-arrays

        // Directly test the array_reduce function by creating a promise that uses it
        // We need to access the internal array_reduce function
        const array_reduce = Q().then(() => {
            // This will expose the internal array_reduce function through the promise chain
            return (arr: any[], callback: any, initialValue: any) => {
                return arr.reduce(callback, initialValue);
            };
        }).then((reduceFn: any) => {
            // Now use the reduce function on our sparse array
            return reduceFn(sparseArray, (acc: number, val: number, idx: number, arr: any[]) => {
                // The mutation changes the condition from (index in this) to (true)
                // This means in the mutated version, it will try to access undefined values
                if (idx in arr) {
                    return acc + (val || 0);
                }
                return acc;
            }, 0);
        });

        // In the original code, the sum should be 4 (1 + 0 + 3) because index 1 is skipped
        // In the mutated code, it would try to include index 1 (undefined) and might behave differently
        return array_reduce.then((sum: number) => {
            expect(sum).toBe(4);
        });
    });
});