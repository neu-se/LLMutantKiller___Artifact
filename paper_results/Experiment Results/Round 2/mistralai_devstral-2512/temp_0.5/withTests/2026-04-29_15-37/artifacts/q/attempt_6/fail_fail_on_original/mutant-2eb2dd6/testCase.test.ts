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

        // Should throw TypeError because first element is missing and no initial value
        await expect(result).rejects.toThrow(TypeError);
    });
});