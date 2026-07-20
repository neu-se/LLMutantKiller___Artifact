import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation test", () => {
    it("should correctly handle array operations that use array_reduce", () => {
        // Create an array with values
        const values = [1, 2, 3, 4, 5];

        // Use Q.all which internally uses array_reduce
        const promises = values.map(val => Q(val));

        return Q.all(promises)
            .then((results: number[]) => {
                // Verify all values are present and correct
                expect(results).toEqual([1, 2, 3, 4, 5]);

                // Now test that we can perform operations on the results
                let sum = 0;
                for (let i = 0; i < results.length; i++) {
                    sum += results[i];
                }
                expect(sum).toBe(15);
            });
    });
});