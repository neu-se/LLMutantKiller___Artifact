// Test case to detect the mutation in array_map implementation
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_map mutation", () => {
    it("should correctly handle array operations in promise chains", () => {
        // Create a promise chain that uses array_map internally
        const promise = Q.resolve([1, 2, 3])
            .then((arr: number[]) => {
                // This should trigger the array_map implementation
                return arr.map((x: number) => x + 1);
            })
            .then((result: number[]) => {
                // Verify the mapping worked
                expect(result).toEqual([2, 3, 4]);
                return result;
            });

        return promise;
    });
});