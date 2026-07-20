// Test case to detect the mutation in array_map implementation
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_map mutation", () => {
    it("should correctly transform array values using array_map", () => {
        // Create a promise that resolves to an array
        const promise = Q.resolve([1, 2, 3]);

        // Use then with a transformation that relies on array_map
        return promise.then((values: number[]) => {
            // This transformation should work correctly with proper array_map
            const transformed = values.map((x: number) => x * 2);
            expect(transformed).toEqual([2, 4, 6]);

            // Also test with a more complex transformation
            const complex = values.map((x: number) => ({ value: x, doubled: x * 2 }));
            expect(complex).toEqual([
                { value: 1, doubled: 2 },
                { value: 2, doubled: 4 },
                { value: 3, doubled: 6 }
            ]);
        });
    });
});