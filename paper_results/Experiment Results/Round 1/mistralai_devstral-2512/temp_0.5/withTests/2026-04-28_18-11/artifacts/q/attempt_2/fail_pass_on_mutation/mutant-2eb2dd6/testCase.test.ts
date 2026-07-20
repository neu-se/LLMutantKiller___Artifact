import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation test", () => {
    it("should correctly handle sparse arrays in promise operations", () => {
        // Create a sparse array where some indices are missing
        const sparseArray = [1, , 3]; // index 1 is missing
        sparseArray[4] = 5; // index 3 is missing

        // Test that Q.all works correctly with sparse arrays
        // Q.all internally uses array_reduce which would be affected by the mutation
        const promises = sparseArray.map((value, index) => {
            if (value !== undefined) {
                return Q(value);
            }
            return Q(void 0);
        });

        return Q.all(promises)
            .then((results: any[]) => {
                // Filter out undefined values to get the actual values
                const actualValues = results.filter(val => val !== void 0);
                expect(actualValues).toEqual([1, 3, 5]);
            });
    });
});