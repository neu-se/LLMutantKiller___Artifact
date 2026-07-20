import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf mutation test", () => {
    it("should correctly handle array operations in Q.all", () => {
        // Create promises that will resolve with array values
        const promises = [
            Q.resolve([1, 2, 3]),
            Q.resolve([4, 5, 6]),
            Q.resolve([7, 8, 9])
        ];

        return Q.all(promises).then((results: number[][]) => {
            // Verify the results are correct
            expect(results.length).toBe(3);
            expect(results[0]).toEqual([1, 2, 3]);
            expect(results[1]).toEqual([4, 5, 6]);
            expect(results[2]).toEqual([7, 8, 9]);

            // Test array operations that might use indexOf internally
            const combined = results.flat();
            expect(combined.indexOf(5)).toBe(4);
            expect(combined.indexOf(9)).toBe(8);
            expect(combined.indexOf(99)).toBe(-1);
        });
    });
});