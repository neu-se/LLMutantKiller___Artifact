const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
    it("should correctly handle sparse arrays in reduce with side effects", async () => {
        // Create a sparse array where some indices are missing
        const sparseArray = [1, , 3, , 5]; // indices 1 and 3 are missing
        const sideEffects: number[] = [];

        const callback = (acc: number, val: number, idx: number) => {
            sideEffects.push(idx); // Track which indices were visited
            return acc + val;
        };

        // Use Q to wrap the array_reduce operation
        const result = await Q(sparseArray).then((arr: any[]) => {
            return Q(arr.reduce(callback, 0));
        });

        // The sum should be 1 + 3 + 5 = 9 (skipping undefined values)
        expect(result).toBe(9);
        // Should have visited indices 0, 2, 4 (skipping 1 and 3)
        expect(sideEffects).toEqual([0, 2, 4]);
    });
});