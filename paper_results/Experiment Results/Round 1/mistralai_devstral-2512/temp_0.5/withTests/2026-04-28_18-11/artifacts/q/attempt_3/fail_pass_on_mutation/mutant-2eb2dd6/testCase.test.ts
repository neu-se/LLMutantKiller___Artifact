import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation test", () => {
    it("should correctly reduce array values in promise operations", () => {
        // Create an array with values that need to be summed
        const values = [1, 2, 3, 4, 5];

        // Use Q to create promises and then reduce them
        // This will use the array_reduce function internally
        const promises = values.map(val => Q(val));

        return Q.all(promises)
            .then((results: number[]) => {
                // Now use reduce on the results
                // This directly tests the array_reduce implementation
                const sum = results.reduce((acc, val) => acc + val, 0);
                expect(sum).toBe(15);
            });
    });
});