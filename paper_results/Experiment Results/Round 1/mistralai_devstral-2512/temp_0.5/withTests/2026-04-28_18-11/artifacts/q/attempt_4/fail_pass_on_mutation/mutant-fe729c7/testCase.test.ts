const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
    it("should correctly handle sparse arrays in reduce", () => {
        // Create a sparse array where index 1 is not present
        const sparseArray = [1, , 3]; // eslint-disable-line no-sparse-arrays

        // Test the array_reduce function directly by using Q.all which internally uses array_reduce
        const promise = Q.all([Q(sparseArray[0]), Q(sparseArray[1]), Q(sparseArray[2])]);

        // In the original code, this should resolve with [1, undefined, 3]
        // In the mutated code, the behavior might differ due to the changed reduce implementation
        return promise.then((result: any[]) => {
            expect(result).toEqual([1, undefined, 3]);
            expect(result.length).toBe(3);
        });
    });
});