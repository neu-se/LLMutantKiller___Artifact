const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
    it("should correctly reduce sparse arrays with initial value", async () => {
        // Create a sparse array where some indices are missing
        const sparseArray = [1, , 3, , 5]; // indices 1 and 3 are missing
        const initialValue = 10;
        const callback = (acc: number, val: number, idx: number) => {
            return acc + val;
        };

        // Use Q to wrap the array_reduce operation
        const result = await Q(sparseArray).then((arr: any[]) => {
            return Q(arr.reduce(callback, initialValue));
        });

        // The sum should be 10 (initial) + 1 + 3 + 5 = 19 (skipping undefined values)
        expect(result).toBe(19);
    });
});