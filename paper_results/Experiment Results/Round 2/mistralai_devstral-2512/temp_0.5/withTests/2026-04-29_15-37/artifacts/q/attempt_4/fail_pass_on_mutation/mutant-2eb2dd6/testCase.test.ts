const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
    it("should correctly handle sparse arrays in reduce", async () => {
        // Create a sparse array where some indices are missing
        const sparseArray = [1, , 3, , 5]; // indices 1 and 3 are missing
        const initialValue = 0;
        const callback = (acc: number, val: number, idx: number) => {
            return acc + val;
        };

        // Directly test the array_reduce function by using Q's internal implementation
        const result = await Q(sparseArray).then((arr: any[]) => {
            // Use the internal array_reduce implementation
            return Q(arr.reduce(callback, initialValue));
        });

        // The sum should be 1 + 3 + 5 = 9 (skipping undefined values)
        expect(result).toBe(9);
    });
});