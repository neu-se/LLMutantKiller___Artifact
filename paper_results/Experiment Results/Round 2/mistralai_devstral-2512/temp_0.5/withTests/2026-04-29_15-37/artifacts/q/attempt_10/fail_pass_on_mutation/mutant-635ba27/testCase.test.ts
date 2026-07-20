import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf mutation test", () => {
    it("should correctly handle array operations in promise resolution", () => {
        // Create a test that will use array operations internally
        const testArray = [1, 2, 3, 4, 5];

        // Test through Q.all which uses array operations internally
        const promises = testArray.map(value => Q.resolve(value));

        return Q.all(promises).then((results: number[]) => {
            // Verify the results are correct
            expect(results).toEqual(testArray);

            // Test that we can find elements in the results
            // This tests the array operations that would be affected by the mutation
            expect(results.indexOf(3)).toBe(2);
            expect(results.indexOf(5)).toBe(4);
            expect(results.indexOf(99)).toBe(-1);

            // Test with a sparse array
            const sparseArray = [1, , 3]; // eslint-disable-line no-sparse-arrays
            return Q.all(sparseArray.map(value => Q.resolve(value)));
        }).then((sparseResults: (number | undefined)[]) => {
            expect(sparseResults[0]).toBe(1);
            expect(sparseResults[1]).toBe(undefined);
            expect(sparseResults[2]).toBe(3);
        });
    });
});