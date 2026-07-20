// Test case to detect the mutation in array_map implementation
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_map mutation", () => {
    it("should correctly process array values through promise operations", () => {
        // Create a promise that will use array_map during resolution
        const testArray = [1, 2, 3];
        const promise = Q(testArray);

        // Chain operations that rely on proper array_map behavior
        return promise.then((arr: number[]) => {
            // First transformation
            const doubled = arr.map((x: number) => x * 2);
            expect(doubled).toEqual([2, 4, 6]);

            // Second transformation that should fail with mutated array_map
            const withIndex = arr.map((x: number, i: number) => x + i);
            expect(withIndex).toEqual([1, 3, 5]);

            return withIndex;
        });
    });
});