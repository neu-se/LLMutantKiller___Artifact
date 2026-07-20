// Test case to detect the mutation in array_map implementation
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library array_map mutation", () => {
    it("should correctly handle array_map in Q.all implementation", () => {
        // Create promises that will use array_map during resolution
        const promises = [
            Q.resolve(1),
            Q.resolve(2),
            Q.resolve(3)
        ];

        // Q.all internally uses array_map to process the promises
        return Q.all(promises).then((results: number[]) => {
            // Verify all promises resolved correctly
            expect(results).toEqual([1, 2, 3]);

            // Now test with a transformation that should fail with mutated array_map
            const transformed = results.map((x: number) => x * 2);
            expect(transformed).toEqual([2, 4, 6]);

            return transformed;
        });
    });
});