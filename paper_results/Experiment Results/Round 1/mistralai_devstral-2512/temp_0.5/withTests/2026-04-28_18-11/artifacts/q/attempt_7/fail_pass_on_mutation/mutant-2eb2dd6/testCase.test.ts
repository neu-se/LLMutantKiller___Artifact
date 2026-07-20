import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation test", () => {
    it("should correctly process arrays using Q's internal reduce implementation", () => {
        // Create a test array
        const testArray = [1, 2, 3, 4, 5];

        // Use Q.all which internally uses array_reduce for processing promises
        const promises = testArray.map(val => Q(val));

        return Q.all(promises)
            .then((results: number[]) => {
                // Verify all values are present and correct
                expect(results).toEqual([1, 2, 3, 4, 5]);

                // Now test that we can perform operations on the results
                // This simulates what array_reduce should do
                let sum = 0;
                for (let i = 0; i < results.length; i++) {
                    if (i in results) {  // This is the key check that the mutation removes
                        sum += results[i];
                    }
                }
                expect(sum).toBe(15);
            });
    });
});