// Test case to detect the mutation in array_map implementation
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_map mutation", () => {
    it("should correctly use array_map in promise resolution", () => {
        // Create a promise that resolves to an array
        const promise = Q.resolve([1, 2, 3]);

        // Use spread to get individual values (internally uses array_map)
        return promise.spread((a: number, b: number, c: number) => {
            // Verify the values are correctly spread
            expect(a).toBe(1);
            expect(b).toBe(2);
            expect(c).toBe(3);
            return [a, b, c];
        }).then((result: number[]) => {
            // Verify the result
            expect(result).toEqual([1, 2, 3]);
        });
    });
});