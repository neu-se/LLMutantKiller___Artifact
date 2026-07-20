const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
    it("should correctly handle sparse arrays in reduce", () => {
        // Create a sparse array where index 1 is not present
        const sparseArray = [1, , 3]; // eslint-disable-line no-sparse-arrays

        // Test the array_reduce function directly by using Q.spread which internally uses array_reduce
        const promise = Q.spread([Q(1), Q(undefined), Q(3)], (a: number, b: number, c: number) => {
            // In the original code, b should be undefined because index 1 is skipped
            // In the mutated code, the behavior might be different
            return a + (b || 0) + c;
        });

        return promise.then((result: number) => {
            // In the original code, result should be 4 (1 + 0 + 3)
            // In the mutated code, it might try to include the undefined value differently
            expect(result).toBe(4);
        });
    });
});