import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation test", () => {
    it("should correctly reduce array values", () => {
        // Create an array with values that need to be summed
        const values = [1, 2, 3, 4, 5];

        // Use Q to create a promise that will use array_reduce internally
        // The array_map function in Q uses array_reduce
        return Q(values)
            .map((val: number) => val * 2)
            .then((doubled: number[]) => {
                // Verify the mapping worked correctly
                expect(doubled).toEqual([2, 4, 6, 8, 10]);

                // Now test that we can reduce the results
                const sum = doubled.reduce((acc, val) => acc + val, 0);
                expect(sum).toBe(30);
            });
    });
});