const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
    it("should correctly handle sparse arrays in reduce without initial value", async () => {
        // Create a sparse array where the first element is missing
        const sparseArray = [, 2, 3]; // index 0 is missing
        const callback = (acc: number, val: number, idx: number) => {
            return acc + val;
        };

        // Use Q to wrap the array_reduce operation
        const result = await Q(sparseArray).then((arr: any[]) => {
            return Q(arr.reduce(callback));
        });

        // The sum should be 2 + 3 = 5 (skipping first undefined value)
        expect(result).toBe(5);
    });
});